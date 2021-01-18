import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
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
      // data: ['TOM', 'Jerry']
      data: ['TOM']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: ['22:25:00', '22:25:05', '22:25:10', '22:25:15', '22:25:20', '22:25:25', '22:25:30']
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}次/分'
      },

    },
    series: [
      {
        name: 'TOM',
        type: 'line',
        // data: [100, 101, 102, 103, 104, 105, 106],
        data: []
      },
      // {
      //   name: 'Jerry',
      //   type: 'line',
      //   data: [99, 101, 103, 105, 107, 109, 111],
      // }
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
      // data: ['TOM', 'Jerry']
      data: ['TOM']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // data: ['22:25:00', '22:25:05', '22:25:10', '22:25:15', '22:25:20', '22:25:25', '22:25:30']
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}摄氏度'
      },

    },
    series: [
      {
        name: 'TOM',
        type: 'line',
        // data: [100, 101, 102, 103, 104, 105, 106],
        data: []
      }
      // {
      //   name: 'Jerry',
      //   type: 'line',
      //   // data: [99, 101, 103, 105, 107, 109, 111],
      //   data:[]
      // }
    ]
  };
  petes: any;
  userName: string;
  baseUrl = 'http://192.168.43.17:8000/'
  tem;
  rate;
  t1;
  t2;
  constructor(private hc: HttpClient, private authService: AuthService, private WebSocket: WebSocketService) { }

  ngOnInit(): void {
    this.WebSocket.createObservableSocket("ws://192.168.43.17:8085").subscribe(data => {
      // console.log(data);
      let aa = data.split("&&");
      let bb = aa[0].split("=");
      let cc = aa[1].split("=");
      if (bb[0] == "tem") this.tem = Number.parseFloat(bb[1]);
      if (bb[0] == "HeartRate") this.rate = Number.parseInt(bb[1]);
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
      this.petes.forEach(element => {
        console.log(element.DeviceName)
        this.hc.get(this.baseUrl + 'key/' + element.ProductName).subscribe((val2: any) => {
          this.WebSocket.sendMessage('/' + val2 + '/' + element.DeviceName);
        })
      });
    });
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart'));
    var myChart2 = echarts.init(<HTMLDivElement>document.getElementById('echart2'));
    myChart.setOption(<EChartOption>this.option);
    myChart2.setOption(<EChartOption>this.option2);
    clearInterval(this.t1);
    var date = new Date();
    this.t1 = setInterval(() => {
      date = new Date();
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
      if (this.option.series[0].data.length == 7) // 如果数组中存在7个数据则删除第一个
      {
        this.option.series[0].data.splice(0, 1);
      }
      this.option.series[0].data.push(this.rate);//在data里插入光照值
      myChart.setOption(<EChartOption>this.option);
    }, 3000);
    this.t2 = setInterval(() => {
      date = new Date();
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
      if (this.option2.series[0].data.length == 7) // 如果数组中存在7个数据则删除第一个
      {
        this.option2.series[0].data.splice(0, 1);
      }
      this.option2.series[0].data.push(this.tem);//在data里插入光照值
      myChart2.setOption(<EChartOption>this.option2);
    }, 3000);


  }

}
