import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';

import { ReportsComponent } from './reports.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatInputModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressComponent } from '../progress/progress.component';

@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        FlexLayoutModule,
        ChartistModule,
        ChartsModule,
        MatInputModule,
        NgxDatatableModule,
        NgxChartsModule
    ],
    declarations: [ReportsComponent,  
        ProgressComponent
    ],
})

export class ReportsModule {


}


