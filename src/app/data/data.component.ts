import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts'
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
      data: ['TOM', 'Jerry']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['22:25:00', '22:25:05', '22:25:10', '22:25:15', '22:25:20', '22:25:25', '22:25:30']
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
        data: [100, 101, 102, 103, 104, 105, 106],

      },
      {
        name: 'Jerry',
        type: 'line',
        data: [99, 101, 103, 105, 107, 109, 111],
      }
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
      data: ['TOM', 'Jerry']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['22:25:00', '22:25:05', '22:25:10', '22:25:15', '22:25:20', '22:25:25', '22:25:30']
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
        data: [100, 101, 102, 103, 104, 105, 106],

      },
      {
        name: 'Jerry',
        type: 'line',
        data: [99, 101, 103, 105, 107, 109, 111],
      }
    ]
  };
  constructor() { }

  ngOnInit(): void {
    var myChart = echarts.init(<HTMLDivElement>document.getElementById('echart'));
    myChart.setOption(<EChartOption>this.option);
    var myChart2 = echarts.init(<HTMLDivElement>document.getElementById('echart2'));
    myChart2.setOption(<EChartOption>this.option2);
  }

}
