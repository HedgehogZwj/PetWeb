import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { people } from './people';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  peoples$: Observable<people>;
  baseUrl = "http://localhost:8000/";
  page$: Number;
  sumpage$: Number;
  sumnum$: Number;
  currentid: string;
  command: boolean;
  arr$ = new Array<people>();
  constructor(private hc: HttpClient) { }
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
    let len = (<number>this.page$) * 6 - (<number>this.sumnum$);
    console.log(len);
    for (let i = 0; i < len; i++) {
      this.arr$.push(new people());
    }
  }
  add() {
    var id = (<HTMLInputElement>document.getElementById('addid')).value;
    var type = (<HTMLInputElement>document.getElementById('addtype')).value;
    var info = (<HTMLInputElement>document.getElementById('addinfo')).value;
    this.hc.post(this.baseUrl + 'people', { id: id, type: type, info: info }).subscribe((val: any) => {
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
  addpage() {
    this.command = true;
    (<HTMLInputElement>document.getElementById('addid')).value = '';
    (<HTMLInputElement>document.getElementById('addtype')).value = '';
    (<HTMLInputElement>document.getElementById('addinfo')).value = '';
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
    var id = (<HTMLInputElement>document.getElementById('id')).value;
    if (id == '') id = "0";
    this.peoples$ = <Observable<people>>this.hc.get(this.baseUrl + 'people/led/' + Number.parseInt(id));
    this.peoples$.subscribe((val: any) => {
      this.sumnum$ = (<Array<people>>val).length;
      this.sumpage$ = Math.trunc(((<Array<people>>val).length / 6));
      if ((<number>this.sumnum$ % 6) != 0) this.sumpage$ = this.sumpage$.valueOf() + 1;
      this.fill();
    })
  }
  delete(id) {
    // console.log("de")
    this.hc.delete(this.baseUrl + 'people/led/' + id).subscribe((val: any) => {
      this.page$ = 1;
      // console.log("delete")
      this.init();
    })
  }
  updatepage(id, type, info) {
    this.currentid = id;
    this.command = true;
    (<HTMLInputElement>document.getElementById('upid')).value = id;
    (<HTMLInputElement>document.getElementById('uptype')).value = type;
    (<HTMLInputElement>document.getElementById('upinfo')).value = info;
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page hide';
    pages[2].className = 'page';
  }
  update() {
    var id = (<HTMLInputElement>document.getElementById('upid')).value;
    var type = (<HTMLInputElement>document.getElementById('uptype')).value;
    var info = (<HTMLInputElement>document.getElementById('upinfo')).value;
    if (id != this.currentid) {
      alert('id不可修改');
    }
    else {
      this.hc.put(this.baseUrl + 'people', { id: id, type: type, info: info }).subscribe((val: any) => {
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
    this.init();
  }

}
