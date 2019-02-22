import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
declare var require: any;
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

const data: any = require('./data.json');
const data1: any = require('./data1.json');
declare function callprogress():any;
export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})


export class ReportsComponent implements AfterViewInit {
  chart = [];
  readonly progress: Observable<number>;
  constructor() {

    this.progress = this.emulateProgress();
   
  }

  emulateProgress() {
    return new Observable<number>(observer => {
      let val = 0;
      const interval = setInterval(() => {
        if (val < 100) {
          val++;
        } else {
          val = 0;
        }

        observer.next(val);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    });
  }

 
  // This is for the donute chart
  donuteChart1: Chart = {
    type: 'Pie',
    data: data['Pie'],
    options: {
      donut: true,
      showLabel: false,
      donutWidth: 30

    }
    // events: {
    //   draw(data: any): boolean {
    //     return data;
    //   }
    // }
  };

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Desktop',
    'Mobile',
    'Tablet'
  ];
  public doughnutChartOptions: any = {
    responsive: false
  };

  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartLegend: boolean = false;

  ngAfterViewInit() {
    this.chart  = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ["June 23", "June 24", "June 25", "June 26", "June 27", "June 28"],
        datasets: [{
          label: '# of Votes',
          data: [100, 200, 300, 600, 500, 600, 700],
          fill: false,
          backgroundColor: ['#ff634e'],
          borderColor: ['#ff634e'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })
    //Sparkline chart
    var sparklineLogin = function () {
      // spark count
      (<any>$('.spark-count')).sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
        type: 'bar'
        , width: '100%'
        , height: '70'
        , barWidth: '2'
        , resize: true
        , barSpacing: '6'
        , barColor: 'rgba(255, 255, 255, 0.3)'
      });

    }
    var sparkResize;
    (<any>$(window)).resize(function (e) {
      clearTimeout(sparkResize);
      sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();
  }
}


