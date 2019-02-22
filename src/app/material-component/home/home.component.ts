import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';

import * as shape from 'd3-shape';
import { single, multi, generateData } from './chartData';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import * as d3 from 'd3';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  single: any[];
  multi: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  showYAxisLabel = true;
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 4;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;

  colorScheme = {
    domain: ['#1e88e5', '#FF5350', ]
  };
  schemeType = 'ordinal';

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    Object.assign(this, {
      single,
      multi
    });
    this.dateData = generateData(6, false);
    this.dateDataWithRange = generateData(2, true);
  }
  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }

  // line interpolation
  curve = shape.curveLinear;

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }


  ngOnInit() {
    const sparklineLogin = function () {
      // spark count
      (<any>$('.spark-count')).sparkline(
        [4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9],
        {
          type: 'bar',
          width: '100%',
          height: '70',
          barWidth: '2',
          resize: true,
          barSpacing: '6',
          barColor: 'rgba(255, 255, 255, 0.3)'
        }
      );
      // site A
      (<any>$('.sitea')).sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
        type: 'line',
        width: '90%',
        height: '50',
        lineColor: '#26c6da',
        fillColor: '#26c6da',
        maxSpotColor: '#26c6da',
        highlightLineColor: 'rgba(0, 0, 0, 0.2)',
        highlightSpotColor: '#26c6da'
      });
      // site B
      (<any>$('.siteb')).sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
        type: 'line',
        width: '90%',
        height: '50',
        lineColor: '#1e88e5',
        fillColor: '#1e88e5',
        maxSpotColor: '#1e88e5',
        highlightLineColor: 'rgba(0, 0, 0, 0.2)',
        highlightSpotColor: '#1e88e5'
      });
      // site C
      (<any>$('.sitec')).sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
        type: 'line',
        width: '90%',
        height: '50',
        lineColor: '#f86c6b',
        fillColor: '#f86c6b',
        maxSpotColor: '#f86c6b',
        highlightLineColor: 'rgba(0, 0, 0, 0.2)',
        highlightSpotColor: '#f86c6b'
      });




    };


    let sparkResize;
    (<any>$(window)).resize(function (e) {
      clearTimeout(sparkResize);
      sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();


  }


  // Load Function
  load() {
    this.auth.getEmployee();
    console.log();

  }
}
