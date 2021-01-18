import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { pet } from './pet';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  petes: Array<pet>;
  baseUrl = 'http://192.168.43.17:8000/'
  userName = '';
  constructor(private hc: HttpClient, private authService: AuthService, private router: Router) { }

  addpet() {
    this.router.navigate(['/show/manager/addpet']);
  }
  refresh() {
    this.userName = this.authService.currentUser;
    this.hc.get(this.baseUrl + 'pet/' + this.userName).subscribe((val: any) => {
      // console.log(val.value);
      this.petes = val.value;
    });
  }
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.refresh();
  }
  update(name, id) {
    var age = (<HTMLInputElement>document.getElementById('age' + id)).value;
    var sex = (<HTMLInputElement>document.getElementById('sex' + id)).value;
    var type = (<HTMLInputElement>document.getElementById('type' + id)).value;
    var character = (<HTMLInputElement>document.getElementById('charac' + id)).value;
    this.hc.put(this.baseUrl + 'pet', { name: name, master: this.userName, sex: sex, age: age, type: type, character: character }).subscribe((val: any) => {
      if (val.succ) {
        alert('修改成功');
        this.refresh();
      }
      else {
        alert('修改失败')
      }
    })
  }
  delete(name, id) {
    this.hc.delete(this.baseUrl + 'pet/' + name + "/" + this.userName).subscribe((val: any) => {
      if (val.succ) {
        alert('删除成功');
        this.refresh();
      }
      else {
        alert('删除失败')
      }
    })
  }
}
