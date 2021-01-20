import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  userName: string;
  tel: string;
  add: string;
  baseUrl = 'http://192.168.43.17:8000/'
  constructor(private authService: AuthService, private hc: HttpClient) { }

  updatepage() {
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page';
    (<HTMLInputElement>document.getElementById('tel')).value = this.tel;
    (<HTMLInputElement>document.getElementById('address')).value = this.add;
  }

  exit() {
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page';
    pages[1].className = 'page hide';
  }
  update() {
    var userName = this.authService.currentUser;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var newpassword = (<HTMLInputElement>document.getElementById('newpassword')).value;
    var confirmpassword = (<HTMLInputElement>document.getElementById('confirmpassword')).value;
    var tel = (<HTMLInputElement>document.getElementById('tel')).value;
    var add = (<HTMLInputElement>document.getElementById('address')).value;
    if (newpassword.length < 6) alert('新密码长度不能小于6位')
    else if (newpassword === confirmpassword) {
      this.hc.post(this.baseUrl + 'login', { userName: userName, password: password }).subscribe((val: any) => {
        if (val.succ) {
          this.hc.put(this.baseUrl + 'user', { userName: userName, password: newpassword, tel: tel, add: add }).subscribe((val: any) => {
            if (val.succ) {
              alert('修改成功');
              (<HTMLInputElement>document.getElementById('password')).value = '';
              (<HTMLInputElement>document.getElementById('newpassword')).value = '';
              (<HTMLInputElement>document.getElementById('confirmpassword')).value = '';
              this.get();
              this.exit();
            }
            else {
              alert('修改失败');
            }
          })
        }
        else {
          alert('原密码错误');
        }
      })
    }
    else {
      alert('新密码与确认密码内容不一致')
    }
  }
  get() {
    this.hc.get(this.baseUrl + 'user/' + this.userName).subscribe((val: any) => {
      val.value.forEach(element => {
        if (element.userName == this.userName) {
          console.log(element);
          this.tel = element.tel;
          this.add = element.address;
        }
      });
    })
  }
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.userName = this.authService.currentUser;
    this.get();
  }


}
