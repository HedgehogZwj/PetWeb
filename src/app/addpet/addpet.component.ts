import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {

  baseUrl = 'http://192.168.43.17:8000/'
  constructor(private hc: HttpClient, private authService: AuthService, private router: Router) { }
  addpet() {
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const sex = (<HTMLInputElement>document.getElementById('sex')).value;
    const type = (<HTMLInputElement>document.getElementById('type')).value;
    const age = (<HTMLInputElement>document.getElementById('age')).value;
    const character = (<HTMLInputElement>document.getElementById('character')).value;
    const master = this.authService.currentUser;
    const obj = {
      name: name,
      sex: sex,
      type: type,
      age: age,
      character: character,
      master: master
    }
    if (name.length == 0) {
      alert('宠物姓名不能为空');
    }
    else {
      this.hc.post(this.baseUrl + 'pet', obj).subscribe((val: any) => {
        if (val.succ) {
          alert(val.message);
          this.router.navigate(['/show/manager']);
        }
        else {
          alert(val.message);
        }
      })
    }
  }
  ngOnInit(): void {

  }

}
