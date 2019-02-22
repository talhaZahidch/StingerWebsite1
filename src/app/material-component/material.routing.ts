import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { StingsComponent } from './stings/stings.component';
import { EmployeesComponent } from './employees/employees.component';


export const MaterialRoutes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'reports',
    component: ReportsComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'employees',
    component: EmployeesComponent
  }, {
    path: 'stings',
    component: StingsComponent
  },
];
