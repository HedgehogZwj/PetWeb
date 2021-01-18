import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data = [
    { name: '海门', value: 100 }
  ];

  geoCoordMap = {
    '海门': [121.15, 31.89],
  };
  option = {
    backgroundColor: 'transparent',
    title: {
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [104.114129, 37.550339],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
              "color": "#044161"
            }
          },
          {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
              "color": "#004981"
            }
          },
          {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
              "color": "#064f85"
            }
          },
          {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
              "color": "#004981"
            }
          },
          {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#005b96",
              "lightness": 1
            }
          },
          {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
              "color": "#004981"
            }
          },
          {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#00508b"
            }
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
              "color": "#056197",
              "visibility": "off"
            }
          },
          {
            "featureType": "subway",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
              "visibility": "off"
            }
          },
          {
            "featureType": "boundary",
            "elementType": "geometry.fill",
            "stylers": {
              "color": "#029fd4"
            }
          },
          {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
              "color": "#1a5787"
            }
          },
          {
            "featureType": "label",
            "elementType": "all",
            "stylers": {
              "visibility": "off"
            }
          }
        ]
      }
    },
    series: [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: this.convertData(this.data),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return val[2] / 10;
        },
        label: {
          formatter: '{b}',
          position: 'right'
        },
        itemStyle: {
          color: '#ddb926'
        },
        emphasis: {
          label: {
            show: true
          }
        }
      }
    ]
  };

  option2 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
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

  // option3 = {
  // title: {
  //     text: '动态数据 + 时间坐标轴'
  // },
  // tooltip: {
  //     trigger: 'axis',
  //     formatter: function (params) {
  //         params = params[0];
  //         var date = new Date(params.name);
  //         return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
  //     },
  //     axisPointer: {
  //         animation: false
  //     }
  // },
  // xAxis: {
  //     type: 'time',
  //     splitLine: {
  //         show: false
  //     }
  // },
  // yAxis: {
  //     type: 'value',
  //     boundaryGap: [0, '100%'],
  //     splitLine: {
  //         show: false
  //     }
  // },
  // series: [{
  //     name: '模拟数据',
  //     type: 'line',
  //     showSymbol: false,
  //     hoverAnimation: false,
  //     data: data
  // }]
  // };

  constructor() { }
  
  ngOnInit(): void {
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart'));
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart2'));
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart3'));
    myChart.setOption(<EChartOption>this.option);
    myChart.setOption(<EChartOption>this.option2);
    // myChart.setOption(<EChartOption>this.option3);
  };
  convertData(data) {
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
  }


}

