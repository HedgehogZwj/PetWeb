import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = 'http://192.168.43.17:8000/'
  constructor(private hc: HttpClient, private router: Router, private AuthService: AuthService) { }

  login() {
    var userName = (<HTMLInputElement>document.getElementById('userName')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    // this.router.navigate(['/show']);
    if (userName.length == 0 || password.length == 0) {
      alert('用户名或密码不能为空');
      return;
    }
    this.hc.post(this.baseUrl + 'login', { userName: userName, password: password }).subscribe((val: any) => {
      if (val.succ) {
        this.router.navigate(['/show']);
        this.AuthService.login();
        this.AuthService.currentUser = userName;
        console.log(val.value[0]);
        this.AuthService.identity = val.value[0].identity;
        console.log(this.AuthService.identity);
        return;
      }
      else {
        alert('登陆失败，请检查用户名和密码是否填写正确')
      }
    })
  }

  ngOnInit(): void {
    this.baseUrl = 'http://' + this.AuthService.ip + ':8000/';
  }

}
