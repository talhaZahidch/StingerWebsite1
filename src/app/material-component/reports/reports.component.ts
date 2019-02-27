import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
declare var require: any;
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
declare var jQuery: any;
const colors={
  IN: '#5478ab',
        DK: '#88b7d6',
        PL: '#5478ab',
        IQ: '#98c6e5',
        RU: '#27a4f3',
        CN: '#b6d4e9',
        AU: '#5478ab',
        AR: '#ff7216',
        FR: '#9ccbeb',
        NG: '#98c6e5',
        CA: '#ff7216',
        US: '#38b002',
        MX: '#ffd62e',
        GL: '#ffd62e',
        MN: '#ff1d45',
        KZ: '#2ee224',
        JP: '#ff1d45',
        PK: '#ff1d45',
        AF: '#60d2dc',
        IR: '#ff7216',
        TM: '#ffd62e',
        UZ: '#ff1d45',
        KG: '#ff7216',
        TJ: '#71d2db',
        TR: '#17edbd',
        LY: '#ff7216',
        DZ: '#fffeb8',
        ML: '#ffd62e',
        MA: '#60d2dc',
        MR: '#ff7216',
        EH: '#ffd62e',
        NE: '#ff1d45',
        EG: '#ff1d45',
        TD: '#ffd62e',
        SD: '#fffeb8',
        CF: '#8562a3',
        CM: '#ff1d45',
        GA: '#60d2dc',
        CG: '#ff7216',
        GQ: '#fffeb8',
        CD: '#60d2dc',
        AO: '#ff1d45',
        ET: '#ff1d45',
        UG: '#ff1d45',
        TZ: '#fffeb8',
        ZM: '#ffd62e',
        ZW: '#ff7216',
        NA: '#fffeb8',
        BW: '#ff1d45',
        ZA: '#ffd62e',
        LS: '#fffeb8',
        SZ: '#fffeb8',
        MZ: '#60d2dc',
        MW: '#ff1d45',
        KE: '#ffd62e',
        SA: '#fffeb8',
        YE: '#ff7216',
        OM: '#60d2dc',
        AE: '#ff1d45',
        NO: '#fffeb8',
        FI: '#ff1d45',
        EE: '#fffeb8',
        LV: '#ff7216',
        SE: '#ff1d45',
        ES: '#f8133e',
        PT: '#fffeb8',
        BR: '#fffeb8',
        VE: '#ffd62e',
        GY: '#60d2dc',
        SR: '#ff7216',
        CO: '#ff1d45',
        EC: '#60d2dc',
        PE: '#ff7216',
        BO: '#60d2dc',
        CL: '#ffd62e',
        PY: '#ff1d45',
        UY: '#60d2dc',
        GT: '#ff1d45',
        HN: '#ff7216',
        SV: '#66d1db',
        NI: '#ffd62e',
        CR: '#ffd2da',
        SN: '#60d2dc',
        GW: '#f74263',
        GN: '#ffd62e',
        CS: '#ff1d45',
        LR: '#fff9c5',
        CI: '#ff7216',
        BF: '#60d2dc',
        GH: '#ffd62e',
        TG: '#ff7d65',
        BJ: '#ff7216',
        SL: '#60d2dc',
        TN: '#60d2dc',
        NZ: '#ff7216',
        PG: '#60d2dc',
        ID: '#ff7216',
        MY: '#ff1d45',
        PH: '#60d2dc',
        MG: '#ff1d45',
        SO: '#fffeb8',
        ER: '#60d2dc',
        SY: '#ff7216',
        JO: '#60d2dc',
        IL: '#ffca2f',
        SM: '#ff7216',
        BI: '#ffd62e',
        RW: '#ff7216',
        MM: '#ff1d45',
        BD: '#fffeb8',
        NP: '#ff9a38',
        TH: '#ffd62e',
        LA: '#fffeb8',
        KH: '#ff1d45',
        BT: '#ff1d45',
        VN: '#60d2dc',
        TW: '#ff8739',
        KR: '#ffd62e',
        KP: '#ff1d45',
        BN: '#ff6758',
        LK: '#fffeb8',
        SS: '#ff1d45',
        SI: '#fffeb8',
        PA: '#ff1d45',
        RO: '#fffeb8',
        DE: '#fffeb8',
        UA: '#ff7216',
        BG: '#fffeb8',
        MD: '#ff405b',
        BY: '#60d2dc',
        CU: '#ff405b',
        DO: '#60d2dc',
        LT: '#ff1d45',
        CZ: '#ff405b',
        NL: '#f60d2d',
        sI: '#ff1d45',
        HU: '#ff1d45',
        AT: '#f60d2d',
        IT: '#ff1d45',
        CH: '#ff7216',
        IS: '#ff7216',
        GB: '#ffd62e',
        IE: '#60d2dc',
        BA: '#fffeb8',
        GR: '#ff1d45',
        AL: '#ff405b',
        GE: '#fffeb8',
        AZ: '#fffeb8',
        AM: '#fffeb8',
        HR: '#fffeb8',
      }
const data: any = require('./data.json');
const data1: any = require('./data1.json');
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
    this.chart  = new Chart('canvas2', {
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
   
    jQuery('#map1').vectorMap(
      {
        backgroundColor: 'white',
        regionStyle: {
          initial: {
            fill: ''
          }
        },
        series: {
          regions: [{
            values: colors
          }]
        }
      });
         //Map2
         jQuery('#map2').vectorMap({
          backgroundColor: 'white',
          regionStyle: {
            initial: {
              fill: ''
            }
          },
          series: {
            regions: [{
              values: colors
            }]
          }
        });
        //Map2
        jQuery('#map3').vectorMap({
          backgroundColor: 'white',
          regionStyle: {
            initial: {
              fill: ''
            }
          },
          series: {
            regions: [{
              values: colors
            }]
          }
        });

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


