import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { device } from './device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices$: Observable<device>;
  baseUrl = 'http://192.168.43.17:8000/'
  page$: Number;
  sumpage$: Number;
  sumnum$: Number;
  currentid: string;
  command: boolean;
  device$ = new Array<device>();
  arr$ = new Array<device>();
  constructor(private hc: HttpClient, private authService: AuthService) { }
  last() {
    if (this.page$ == 1) {
      alert('当前页已经是第一页，真的不能再往前了');
    }
    else {
      this.arr$ = new Array<device>();
      this.page$ = this.page$.valueOf() - 1;
    }
  }
  next() {
    if (this.page$ == this.sumpage$) {
      alert('当前页已经是最后一页了，真的不能再往后了')
    }
    else {
      this.arr$ = new Array<device>();
      this.page$ = this.page$.valueOf() + 1;
      this.fill();
    }
  }
  fill() {
    if (this.page$ != this.sumpage$) return;
    let len = (<number>this.page$) * 8 - (<number>this.sumnum$);
    console.log(len);
    for (let i = 0; i < len; i++) {
      this.arr$.push(new device());
    }
  }
  add() {
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    var DeviceName = (<HTMLInputElement>document.getElementById('DeviceName')).value;
    var ProductName = (<HTMLInputElement>document.getElementById('ProductName')).value;
    var master = (<HTMLInputElement>document.getElementById('master')).value;
    if (DeviceName.length < 4 || DeviceName.length > 32) {
      alert('设备名不合法');
    }
    else {
      let mark = 1;
      for (let i = 0; i < DeviceName.length; i++) {
        if (DeviceName[i] != ':' && DeviceName[i] != '-' && DeviceName[i] != '_' && DeviceName[i] != '@' && DeviceName[i] != '.') {
          if (DeviceName[i] < '0' || (DeviceName[i] > '9' && DeviceName[i] < 'A') || (DeviceName[i] > 'Z' && DeviceName[i] < 'a') || DeviceName[i] > 'z') {
            alert('设备名不合法');
            mark = 0;
            console.log(DeviceName[i])
          }
        }
      }
      if (mark) {
        this.hc.post(this.baseUrl + 'device', { name: name, DeviceName: DeviceName, ProductName: ProductName, master: master }).subscribe((val: any) => {
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
  secret(i) {
    if (document.getElementById('label' + i).className == 'hide') document.getElementById('label' + i).className = '';
    else document.getElementById('label' + i).className = 'hide';
    if (document.getElementById('labelhide' + i).className == 'hide') document.getElementById('labelhide' + i).className = '';
    else document.getElementById('labelhide' + i).className = 'hide';
  }
  query() {
    var obj = <HTMLSelectElement>document.getElementById('select');
    var index = obj.selectedIndex;
    var mark = 4;
    var name = '1';
    var master = '2';
    var ProductName = '3';
    var DeviceName = '4';
    if (obj.options[index].value == 'ProductName' && (<HTMLInputElement>document.getElementById('query')).value) {
      ProductName = (<HTMLInputElement>document.getElementById('query')).value;
      mark = 3;
    }
    else if (obj.options[index].value == 'DeviceName' && (<HTMLInputElement>document.getElementById('query')).value) {
      DeviceName = (<HTMLInputElement>document.getElementById('query')).value;
      mark = 0;
    }
    else if (obj.options[index].value == 'name' && (<HTMLInputElement>document.getElementById('query')).value) {
      name = (<HTMLInputElement>document.getElementById('query')).value;
      mark = 2;
    }
    else if (obj.options[index].value == 'master' && (<HTMLInputElement>document.getElementById('query')).value) {
      master = (<HTMLInputElement>document.getElementById('query')).value;
      mark = 1;
    }
    else if (obj.options[index].value != 'all') {
      alert('请填写查询信息');
      return;
    }
    this.arr$ = new Array<device>();
    this.devices$ = <Observable<device>>this.hc.get(this.baseUrl + 'device/' + name + '/' + master + '/' + ProductName + '/' + DeviceName + '/' + mark);
    this.devices$.subscribe((val: any) => {
      this.device$ = val.value;
      val = val.value;
      this.sumnum$ = (<Array<device>>val).length;
      this.sumpage$ = Math.trunc(((<Array<device>>val).length / 8));
      if ((<number>this.sumnum$ % 8) != 0) this.sumpage$ = this.sumpage$.valueOf() + 1;
      this.fill();
    })
  }
  delete(DeviceName, ProductName) {
    this.hc.delete(this.baseUrl + 'device/' + DeviceName + "/" + ProductName).subscribe((val: any) => {
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
  updatepage(DeviceName, ProductName, name, master) {
    this.command = true;
    (<HTMLInputElement>document.getElementById('upProductName')).value = ProductName;
    (<HTMLInputElement>document.getElementById('upDeviceName')).value = DeviceName;
    (<HTMLInputElement>document.getElementById('upname')).value = name;
    (<HTMLInputElement>document.getElementById('upmaster')).value = master;
    const pages = document.getElementsByClassName('page');
    pages[0].className = 'page hide';
    pages[1].className = 'page hide';
    pages[2].className = 'page';
  }
  update() {
    var ProductName = (<HTMLInputElement>document.getElementById('upProductName')).value;
    var DeviceName = (<HTMLInputElement>document.getElementById('upDeviceName')).value;
    var name = (<HTMLInputElement>document.getElementById('upname')).value;
    var master = (<HTMLInputElement>document.getElementById('upmaster')).value;
    this.hc.put(this.baseUrl + 'device', { name: name, DeviceName: DeviceName, master: master }).subscribe((val: any) => {
      if (val.succ) {
        alert('修改成功');
        this.exit();
      }
      else {
        alert('修改失败')
      }
    })
  }

  repa(id) {
    if (id >= (<number>this.page$ - 1) * 8 && id < (<number>this.page$) * 8) return true;
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
