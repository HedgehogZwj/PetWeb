import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  baseUrl = 'http://localhost:8000/'
  userName = '';
  constructor(private hc: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.currentUser;
    this.hc.get(this.baseUrl + 'pet/' + this.userName).subscribe((val: any) => {
      // console.log(val.value);
      this.petes = val.value;
    });
  }
  update(name, id) {
    var age = (<HTMLInputElement>document.getElementById('age' + id)).value;
    var sex = (<HTMLInputElement>document.getElementById('sex' + id)).value;
    var type = (<HTMLInputElement>document.getElementById('type' + id)).value;
    this.hc.put(this.baseUrl + 'pet', { name: name, master: this.userName, sex: sex, age: age, type: type }).subscribe((val: any) => {
      if (val.succ) {
        alert('修改成功');
      }
      else {
        alert('修改失败')
      }
    })
  }

}
