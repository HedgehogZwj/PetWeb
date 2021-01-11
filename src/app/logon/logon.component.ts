import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  baseUrl = 'http://localhost:8000/';
  constructor(private router: Router, private hc: HttpClient) { }

  logon() {
    var userName = (<HTMLInputElement>document.getElementById('userName')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var confirmpassword = (<HTMLInputElement>document.getElementById('confirmpassword')).value;
    // this.router.navigate(['/login']);
    if (userName.length < 6 || password.length < 6) {
      alert('用户名和密码不得小于6位');
    }
    else if (password != confirmpassword) {
      alert('两次输入的密码不一致');
    }
    else {
      this.hc.post(this.baseUrl + 'user', { userName: userName, password: password }).subscribe((val: any) => {
        if (val.succ) {
          alert('注册成功');
          this.router.navigate(['/login']);
          return;
        }
        else {
          alert('注册失败');
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
