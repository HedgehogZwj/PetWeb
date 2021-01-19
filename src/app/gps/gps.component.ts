import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { pet } from '../pet/pet';
import { point } from './point';
declare var BMapGL: any;

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  constructor(private authService: AuthService, private hc: HttpClient) { }
  points: Array<point>;
  me: point;
  userName;
  baseUrl = '';
  petes: Array<pet>;
  marker;
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.userName = this.authService.currentUser;
    this.me = new point();
    this.me.x = Number(121.47962809);
    this.me.y = Number(31.23663724);
    this.points = new Array<point>();
    this.hc.get(this.baseUrl + 'pet/' + this.userName).subscribe((val: any) => {
      // console.log(val.value);
      this.petes = val.value;
      console.log(this.petes);
      this.petes.forEach(element => {
        var p = new point();
        p.x = this.me.x + Math.random() / 100;
        p.y = this.me.y + Math.random() / 100;
        p.name = element.name;
        this.points.push(p);
        this.look();
      });
    });
  }
  search() {
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    var map = new BMapGL.Map('container');
    var main = new BMapGL.Point(this.me.x, this.me.y);
    map.enableScrollWheelZoom(true);
    if (name) {
      for (let i = 0; i < this.points.length; i++) {
        if (name == this.points[i].name) {
          var point = new BMapGL.Point(this.points[i].x, this.points[i].y);
          var walking = new BMapGL.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
          walking.search(main, point);
          break;
        }
      }
    }
  }
  look() {
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    if (name) {
      var map = new BMapGL.Map('container');
      var main = new BMapGL.Point(this.me.x, this.me.y);
      var mainmark = new BMapGL.Marker(main)
      map.addOverlay(mainmark);
      map.enableScrollWheelZoom(true);
      this.bind(map, mainmark, new BMapGL.InfoWindow("我的位置", { width: 200, height: 100, title: "Me" }), main);
      var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: "宠物名字", // 信息窗口标题
      }
      this.marker = new Array<any>(this.points.length);
      for (let i = 0; i < this.points.length; i++) {
        if (name == this.points[i].name) {
          var point = new BMapGL.Point(this.points[i].x, this.points[i].y);
          this.marker[i] = new BMapGL.Marker(point);
          map.addOverlay(this.marker[i]);
          this.bind(map, this.marker[i], new BMapGL.InfoWindow(this.points[i].name, opts), point);
          map.centerAndZoom(point, 17);
        }
      }
    }
    else {
      var map = new BMapGL.Map('container');
      var main = new BMapGL.Point(this.me.x, this.me.y);
      var mainmark = new BMapGL.Marker(main)
      map.centerAndZoom(main, 15);
      map.addOverlay(mainmark);
      map.enableScrollWheelZoom(true);
      this.bind(map, mainmark, new BMapGL.InfoWindow("我的位置", { width: 200, height: 100, title: "Me" }), main);
      var opts = {
        width: 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title: "宠物名字", // 信息窗口标题
      }
      this.marker = new Array<any>(this.points.length);
      for (let i = 0; i < this.points.length; i++) {
        var point = new BMapGL.Point(this.points[i].x, this.points[i].y);
        this.marker[i] = new BMapGL.Marker(point);
        map.addOverlay(this.marker[i]);
        this.bind(map, this.marker[i], new BMapGL.InfoWindow(this.points[i].name, opts), point);
      }
    }
  }
  bind(map, marker, message, point) {
    marker.onclick = (function () {
      console.log(message.content);
      map.openInfoWindow(message, point); //开启信息窗口
    });
  }
}
