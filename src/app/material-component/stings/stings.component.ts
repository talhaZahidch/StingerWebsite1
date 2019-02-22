import { Component, OnInit , ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Sting } from './sting';

import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DatePickerComponent } from '../datepicker/datepicker.component';
import { TimePickerComponent } from '../datepicker/timepicker.component';

import * as types from 'gijgo';

@Component({
  selector: 'app-stings',
  templateUrl: './stings.component.html',
  styleUrls: ['./stings.component.css']
})
export class StingsComponent implements OnInit {
  @ViewChild("datepicker") datepicker: DatePickerComponent;
  @ViewChild("timepicker") timepicker: TimePickerComponent;

  configuration1: types.TimePickerSettings;
  configuration: types.DatePickerSettings;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private afs: AngularFirestore) {
    this.configuration = { 
      uiLibrary: 'bootstrap4',
      width: 200,
    };
    this.configuration1 = { 
      uiLibrary: 'bootstrap4',
      width: 200,
    };
   }

  stingsCollection: AngularFirestoreCollection<Sting>;
  stingsObservable: Observable<Sting[]>;

  // this is for the start date
  startDate = new Date(1990, 0, 1);

  // Datepicker selected value
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  // Datepicker input and change event

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }


  ngOnInit() {

    // Step 1: Make a reference
    this.stingsCollection = this.afs.collection('stings');

    // Step 2: Get an observable of the data
    this.stingsObservable = this.stingsCollection.valueChanges();

    // Step 3: Subscribing to data can be found in the HTML page.
  }

  notifications: Object[] = [{
    round: 'round-danger',
    icon: 'ti-link',
    title: 'Launch Admin',
    subject: 'Just see the my new admin!',
    time: '9:30 AM'
  }, {
    round: 'round-success',
    icon: 'ti-calendar',
    title: 'Event today',
    subject: 'Just a reminder that you have event',
    time: '9:10 AM'
  }, {
    round: 'round-info',
    icon: 'ti-settings',
    title: 'Settings',
    subject: 'You can customize this template as you want',
    time: '9:08 AM'
  }, {
    round: 'round-primary',
    icon: 'ti-user',
    title: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];

  // This is for Mymessages
  mymessages: Object[] = [{
    useravatar: 'assets/images/users/1.jpg',
    status: 'online',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:30 AM'
  }, {
    icon: 'notifications',
    from: 'Sonu Nigam',
    subject: 'New Update',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/3.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/4.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/6.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/7.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/8.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/6.jpg',
    status: 'offline',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];


}
