import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as types from 'gijgo';

declare var jQuery: any;

@Component({
  selector: 'gijgo-datepicker',
  template: '<input #input class="form-control shadow" type="text">'
})
export class DatePickerComponent implements AfterViewInit, OnDestroy   {

  @ViewChild('input') input: ElementRef;

  @Input() instance: types.DatePicker;

  @Input() configuration: types.DatePickerSettings;

  ngAfterViewInit() {
    this.instance = jQuery(this.input.nativeElement).datepicker(this.configuration);    
  }  
  
  ngOnDestroy() {
    this.instance.destroy();
  }
}