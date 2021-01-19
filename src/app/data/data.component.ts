import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { WebSocketService } from '../websocket/web-socket.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  option = {
    title: {
      text: '宠物心率变化图',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}次/分'
      },

    },
    series: [
    ]
  };
  option2 = {
    title: {
      text: '宠物体温变化图',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}摄氏度'
      },

    },
    series: [
    ]
  };
  petes: any;
  userName: string;
  baseUrl = 'http://192.168.43.17:8000/'
  tem;
  rate;
  t1;
  t2;
  namearr: Array<string>;
  tempername;
  ratename;
  constructor(private hc: HttpClient, private authService: AuthService, private WebSocket: WebSocketService) { }
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.WebSocket.createObservableSocket("ws://" + this.authService.ip + ":8085").subscribe(data => {
      let aa = data.split("&&");
      let bb = aa[0].split("=");
      let cc = aa[1].split(":");
      if (bb[0] == "tem") {
        for (let i = 0; i < this.tempername.length; i++) {
          if (this.tempername[i] == cc[1]) {
            this.tem[i] = Number.parseFloat(bb[1]);
          }
        }
      }
      if (bb[0] == "HeartRate") {
        for (let i = 0; i < this.tempername.length; i++) {
          if (this.ratename[i] == cc[1]) {
            this.rate[i] = Number.parseInt(bb[1]);
          }
        }
      }
    }, (err) => {
      console.log(err);
    })
    this.userName = this.authService.currentUser;
    var mark = 1;
    var name = '1';
    var ProductName = '3';
    var DeviceName = '4';
    this.hc.get(this.baseUrl + 'device/' + name + '/' + this.userName + '/' + ProductName + '/' + DeviceName + '/' + mark).subscribe((val: any) => {
      this.petes = val.value;
      this.namearr = new Array<string>();
      this.petes.forEach(element => {
        if (this.namearr.indexOf(element.name) < 0)
          this.namearr.push(element.name);
        this.hc.get(this.baseUrl + 'key/' + element.ProductName).subscribe((val2: any) => {
          this.WebSocket.sendMessage('/' + val2 + '/' + element.DeviceName);
        })
      });
      this.ratename = new Array<string>(this.namearr.length);
      this.tempername = new Array<string>(this.namearr.length);
      for (let i = 0; i < this.namearr.length; i++) {
        this.petes.forEach(element => {
          if (this.namearr[i] == element.name && element.ProductName == "temperature") {
            this.tempername[i] = element.DeviceName;
          }
          if (this.namearr[i] == element.name && element.ProductName == "pulse") {
            this.ratename[i] = element.DeviceName;
          }
        });
      }
      this.tem = new Array<number>(this.namearr.length);
      this.rate = new Array<number>(this.namearr.length);
    });



    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart'));
    var myChart2 = echarts.init(<HTMLDivElement>document.getElementById('echart2'));
    myChart.setOption(<EChartsOption>this.option);
    myChart2.setOption(<EChartsOption>this.option2);
    clearInterval(this.t1);
    var date = new Date();
    this.t1 = setInterval(() => {
      date = new Date();
      this.option.legend.data = this.namearr;
      if (this.option.xAxis.data.length == 7) // 如果数组中存在7个数据则删除第一个
      {
        this.option.xAxis.data.splice(0, 1);
      }
      var string = date.toLocaleString();
      var ans = "";
      for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] != ':' && (string[i] < '0' || string[i] > '9')) {
          break;
        }
        ans = string[i] + ans;
      }
      this.option.xAxis.data.push(ans);//设置当前时间分秒
      var buff = [];
      let cnt = 0;
      this.namearr.forEach(element => {
        var mark = 0;
        this.option.series.forEach(val => {
          if (val.name == element) {
            mark = 1;
            buff.push({
              name: element,
              type: 'line',
              data: val.data
            })
            cnt++;
          }
        })
        if (mark == 0) {
          buff.push({
            name: element,
            type: 'line',
            data: []
          })
          cnt++;
        }
      })
      this.option.series = buff;
      for (let i = 0; i < this.option.series.length; i++) {
        if (this.option.series[i].data.length == 7) { // 如果数组中存在7个数据则删除第一个
          this.option.series[i].data.splice(0, 1);
        }
        this.option.series[i].data.push(this.rate[i])
      }
      myChart.setOption(<EChartsOption>this.option);
    }, 3000);
    this.t2 = setInterval(() => {
      date = new Date();
      this.option2.legend.data = this.namearr;
      if (this.option2.xAxis.data.length == 7) // 如果数组中存在7个数据则删除第一个
      {
        this.option2.xAxis.data.splice(0, 1);
      }
      var string = date.toLocaleString();
      var ans = "";
      for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] != ':' && (string[i] < '0' || string[i] > '9')) {
          break;
        }
        ans = string[i] + ans;
      }
      this.option2.xAxis.data.push(ans);//设置当前时间分秒
      var buff2 = [];
      let cnt = 0;
      this.namearr.forEach(element => {
        var mark = 0;
        this.option2.series.forEach(val => {
          if (val.name == element) {
            mark = 1;
            buff2.push({
              name: element,
              type: 'line',
              data: val.data
            })
            cnt++;
          }
        })
        if (mark == 0) {
          buff2.push({
            name: element,
            type: 'line',
            data: []
          })
          cnt++;
        }
      })
      this.option2.series = buff2;
      for (let i = 0; i < this.option2.series.length; i++) {
        if (this.option2.series[i].data.length == 7) { // 如果数组中存在7个数据则删除第一个
          this.option2.series[i].data.splice(0, 1);
        }
        this.option2.series[i].data.push(this.tem[i])
      }
      myChart2.setOption(<EChartsOption>this.option2);
    }, 3000);


  }

}
