import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { people } from './people';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  peoples$: Observable<people>;
  baseUrl = 'http://192.168.43.17:8000/'
  page$: Number;
  sumpage$: Number;
  sumnum$: Number;
  currentid: string;
  command: boolean;
  people$ = new Array<people>();
  arr$ = new Array<people>();
  constructor(private hc: HttpClient, private authService: AuthService) { }
  last() {
    if (this.page$ == 1) {
      alert('当前页已经是第一页，真的不能再往前了');
    }
    else {
      this.arr$ = new Array<people>();
      this.page$ = this.page$.valueOf() - 1;
    }
  }
  next() {
    if (this.page$ == this.sumpage$) {
      alert('当前页已经是最后一页了，真的不能再往后了')
    }
    else {
      this.arr$ = new Array<people>();
      this.page$ = this.page$.valueOf() + 1;
      this.fill();
    }
  }
  fill() {
    if (this.page$ != this.sumpage$) return;
    let len = (<number>this.page$) * 8 - (<number>this.sumnum$);
    console.log(len);
    for (let i = 0; i < len; i++) {
      this.arr$.push(new people());
    }
  }
  add() {
    var userName = (<HTMLInputElement>document.getElementById('userName')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var identity = (<HTMLInputElement>document.getElementById('identity')).value;
    if (userName.length == 0){
      alert('用户名不能为空');
    }
    else if (password.length == 0){
      alert('密码不能为空');
    }
    else if (password.length <6 ){
      alert('密码不能少于6位');
    }
    else {
      this.hc.post(this.baseUrl + 'user', { userName: userName, password: password, identity: identity }).subscribe((val: any) => {
        if (val.succ) {
          alert('添加成功');
          this.page$ = 1;
          this.exit();
        }
        else {
          alert('添加失败')
        }
      }) 
    }
    
  }
  addpage() {
    this.command = true;
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page';
    pages[2].className = 'page hide';
  }
  exit() {
    this.query();
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page';
    pages[1].className = 'page hide';
    pages[2].className = 'page hide';
    this.command = false;
  }

  query() {
    this.arr$ = new Array<people>();
    var userName = (<HTMLInputElement>document.getElementById('query')).value;
    if (userName) {
      this.peoples$ = <Observable<people>>this.hc.get(this.baseUrl + 'user/' + userName);
    }
    else {
      this.peoples$ = <Observable<people>>this.hc.get(this.baseUrl + 'all');
    }
    this.peoples$.subscribe((val: any) => {
      this.people$ = val.value;
      val = val.value;
      this.sumnum$ = (<Array<people>>val).length;
      this.sumpage$ = Math.trunc(((<Array<people>>val).length / 8));
      if ((<number>this.sumnum$ % 8) != 0) this.sumpage$ = this.sumpage$.valueOf() + 1;
      this.fill();
    })
  }
  delete(userName) {
    // console.log("de")
    this.hc.delete(this.baseUrl + 'user/' + userName).subscribe((val: any) => {
      console.log(val);
      if (val.succ) {
        alert('删除成功');
        this.page$ = 1;
        this.init();
      }
      else {
        alert('删除失败');
      }
    })
  }
  updatepage(userName, password, identity) {
    this.command = true;
    (<HTMLInputElement>document.getElementById('upuserName')).value = userName;
    (<HTMLInputElement>document.getElementById('uppassword')).value = password;
    (<HTMLInputElement>document.getElementById('upidentity')).value = identity;
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page hide';
    pages[2].className = 'page';
  }
  update() {
    var userName = (<HTMLInputElement>document.getElementById('upuserName')).value;
    var password = (<HTMLInputElement>document.getElementById('uppassword')).value;
    var upidentity = (<HTMLInputElement>document.getElementById('upidentity')).value;
    if (password.length < 6) {
      alert('密码不能少于6位');
    }
    else {
      this.hc.put(this.baseUrl + 'user', { userName: userName, password: password, identity: upidentity }).subscribe((val: any) => {
        if (val.succ) {
          alert('修改成功');
          this.exit();
        }
        else {
          alert('修改失败')
        }
      })
    }
    
  }
  secret(i) {
    if (document.getElementById('label' + i).className == 'hide') document.getElementById('label' + i).className = '';
    else document.getElementById('label' + i).className = 'hide';
    if (document.getElementById('labelhide' + i).className == 'hide') document.getElementById('labelhide' + i).className = '';
    else document.getElementById('labelhide' + i).className = 'hide';
  }
  repa(id) {
    if (id >= (<number>this.page$ - 1) * 6 && id < (<number>this.page$) * 6) return true;
    else return false;
  }
  init() {
    this.page$ = 1;
    this.sumpage$ = 0;
    this.exit();
  }
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.init();
  }

}
