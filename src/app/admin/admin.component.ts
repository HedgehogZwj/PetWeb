import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
declare var BMap: any;
import 'echarts/extension/bmap/bmap'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { device } from '../device/device';
import { element } from 'protractor';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  baseUrl = '';
  data = [{ name: '浙江省', value: 9 }]
  constructor(private authService: AuthService, private hc: HttpClient) { }
  geoCoordMap = {
    '浙江省': [120.15268564, 30.1736802]
  };
  convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = this.geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };
  //地图
  option2 = {
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [114.114129, 30.550339],
      zoom: 6,
      roam: true,
      mapStyle: {
        styleJson: [{
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'land',
          'elementType': 'all',
          'stylers': {
            'color': '#f3f3f3'
          }
        }, {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'color': '#fdfdfd'
          }
        }, {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'green',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'subway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'manmade',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }, {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#fefefe'
          }
        }, {
          'featureType': 'building',
          'elementType': 'all',
          'stylers': {
            'color': '#d1d1d1'
          }
        }, {
          'featureType': 'label',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#999999'
          }
        }]
      }
    },
    series: [
      {
        name: '设备总数',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: [],
        symbolSize: function (val) {
          return val[2] * 2;
        },
        encode: {
          value: 2
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 1
      }
    ]
  };
  //折线图
  option4 = {
    title: {
      text: '接收数据量'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'line',
      areaStyle: {}
    }]
  };
  t1;
  device$: Observable<device>;
  arr$ = new Array<device>();
  myChart3;
  myChart2;
  myChart4;
  option = {
    title: {
      text: '设备信息占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: []
    },
    series: [
      {
        name: '产品名称',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  //横向柱状图
  option3 = {
    title: {
      text: '设备区域分布',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['广东省', '上海市', '江苏省', '山东省', '福建省', '浙江省']
    },
    series: [
      {
        name: '设备总数',
        type: 'bar',
        data: [0, 0, 0, 0, 0, 10]
      }
    ]
  };
  count;
  pie() {
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart'));
    myChart.setOption(<EChartsOption>this.option);
    var date = new Date();
    this.t1 = setInterval(() => {
      date = new Date();
      this.device$ = <Observable<device>>this.hc.get(this.baseUrl + 'device/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 4);
      this.device$.subscribe((val: any) => {
        this.arr$ = val.value;
        var buf = [];
        var num = [];
        this.arr$.forEach(element => {
          let index = buf.indexOf(element.ProductName);
          if (index >= 0) {
            num[index]++;
          }
          else {
            buf.push(element.ProductName);
            num.push(1);
          }
        })
        this.option.legend.data = buf;
        this.option.series[0].data = [];
        this.option3.series[0].data[5] = this.arr$.length;
        this.myChart3.setOption(<EChartsOption>this.option3);
        this.data[0].value = this.arr$.length;
        this.option2.series[0].data = this.convertData(this.data.sort(function (a, b) {
          return b.value - a.value;
        }).slice(0, 6));
        this.hc.get(this.baseUrl + 'datacount').subscribe((val2: any) => {
          if (this.count != 0)
            this.option4.series[0].data.push(val2.value - this.count);
          this.count = val2.value;
          this.option4.xAxis.data.push(date.toLocaleString())
          this.myChart4.setOption(<EChartsOption><unknown>this.option4);
        })
        this.myChart2.setOption(<EChartsOption>this.option2);
        for (let i = 0; i < buf.length; i++) {
          this.option.series[0].data.push({ name: buf[i], value: num[i] });
        }
        myChart.setOption(<EChartsOption>this.option);
      })
    }, 5000);
  }
  map() {
    this.myChart2 = echarts.init(<HTMLDivElement>document.getElementById('echart2'));
    // this.myChart2.setOption(<EChartsOption>this.option2);
  }
  columnar() {
    this.myChart3 = echarts.init(<HTMLDivElement>document.getElementById('echart3'));
    // this.myChart3.setOption(<EChartsOption>this.option3);
  }
  line() {
    this.myChart4 = echarts.init(<HTMLDivElement>document.getElementById('echart4'));
    // this.myChart4.setOption(<EChartsOption><unknown>this.option4);
  }
  ngOnInit(): void {
    this.baseUrl = 'http://' + this.authService.ip + ':8000/';
    this.count = 0;
    this.pie();
    this.map();
    this.columnar();
    this.line();
  }

}
