import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: 'home', type: 'link', name: 'Home', icon: 'lnr lnr-home'},
    {state: 'reports', type: 'link', name: 'Reports', icon: 'lnr lnr-chart-bars'},
    {state: 'users', type: 'link', name: 'Users', icon: 'lnr lnr-users'},
    {state: 'employees', type: 'link', name: 'Employees', icon: 'lnr lnr-users'},
    {state: 'stings', type: 'link', name: 'Stings', icon: 'lnr lnr-rocket'},
];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
