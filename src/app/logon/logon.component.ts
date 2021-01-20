import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  baseUrl = 'http://192.168.43.17:8000/'
  constructor(private router: Router, private hc: HttpClient, private authService: AuthService) { }

  logon() {
    var userName = (<HTMLInputElement>document.getElementById('userName')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var confirmpassword = (<HTMLInputElement>document.getElementById('confirmpassword')).value;
    if (userName.length == 0) {
      alert('用户名不能为空');
    }
    else if (password.length == 0) {
      alert('请输入密码');
    }
    else if (password.length < 6) {
      alert('密码不得小于6位');
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
          alert('该用户已存在');
        }
      })
    }
  }

  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
  }

}
