import { Component, OnInit } from '@angular/core';
declare var BMapGL: any;

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new BMapGL.Map('container');
    map.centerAndZoom(new BMapGL.Point(116.404, 39.928), 15);
    map.enableScrollWheelZoom(true);
    // 创建点标记
    var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925));
    var marker2 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915));
    var marker3 = new BMapGL.Marker(new BMapGL.Point(116.395, 39.935));
    var marker4 = new BMapGL.Marker(new BMapGL.Point(116.415, 39.931));
    // 在地图上添加点标记
    map.addOverlay(marker1);
    map.addOverlay(marker2);
    map.addOverlay(marker3);
    map.addOverlay(marker4);

  }

}
