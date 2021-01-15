import { Component, OnInit } from '@angular/core';
import { point } from './point';
declare var BMapGL: any;

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  constructor() { }
  points: Array<point>;
  me: point;
  ngOnInit(): void {
    this.points = new Array<point>();
    this.me = new point();
    var a = new point();
    a.x = 116.404; a.y = 39.915; a.name = 'TOM';
    var b = new point();
    b.x = 116.395; b.y = 39.935; b.name = 'fph';
    var c = new point();
    c.x = 116.415; c.y = 39.931; c.name = 'ych';
    this.points.push(a);
    this.points.push(b);
    this.points.push(c);
    this.me.x = Number(116.404);
    this.me.y = Number(39.928);
    // var map = new BMapGL.Map('container');
    // map.centerAndZoom(new BMapGL.Point(116.404, 39.928), 15);
    // map.enableScrollWheelZoom(true);
    // 创建点标记
    // var me = new BMapGL.Point(116.404, 39.925);
    // var me = new BMapGL.Marker(me);
    // // 在地图上添加点标记
    // map.addOverlay(me);

    this.look();
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
      map.addOverlay(new BMapGL.Marker(main));
      map.enableScrollWheelZoom(true);
      for (let i = 0; i < this.points.length; i++) {
        if (name == this.points[i].name) {
          var point = new BMapGL.Point(this.points[i].x, this.points[i].y);
          map.centerAndZoom(point, 15);
          map.addOverlay(new BMapGL.Marker(point));
        }
      }
    }
    else {
      var map = new BMapGL.Map('container');
      var main = new BMapGL.Point(this.me.x, this.me.y);
      map.centerAndZoom(main, 15);
      map.addOverlay(new BMapGL.Marker(main));
      map.enableScrollWheelZoom(true);
      for (let i = 0; i < this.points.length; i++) {
        console.log(this.points[i].x)
        var point = new BMapGL.Point(this.points[i].x, this.points[i].y);
        map.addOverlay(new BMapGL.Marker(point));
      }
    }
  }
}
