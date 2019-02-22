import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2';
import { DatePickerComponent } from '../datepicker/datepicker.component';

import * as types from 'gijgo';

import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import * as faker from 'faker';
import { AuthService } from '../../core/auth.service';
import { Person } from '../../core/customer';
declare var $: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit {

  displayedColumns = [ 'name', 'email', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("datepicker") datepicker: DatePickerComponent;

  configuration: types.DatePickerSettings;
  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService, ) {
      this.configuration = { 
        uiLibrary: 'bootstrap4',
        width: 200,
      };
  }

  ngAfterViewInit() {
    this.afs.collection<any>('customers').valueChanges().subscribe(customers => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.sort = this.sort;

    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {

      data: data
    });
  }

  deleteCustomer(data) {
    this.auth.deleteCustomer(data);
    console.log('You clicked Delete');

  }



  trackByUid(index, item) {
    return item.uid;
  }

  newFake() {
    this.auth.fakeNews();
  }



  showSwal(type) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'mat-raised-button primary',
      cancelButtonClass: 'mat-raised-button',
      confirmButtonColor: '#DD6B55',
      buttonsStyling: false
    }).then((result) => {
      // this.afs.collection('customers').doc(this.data.uid).delete();
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your imaginary file has been deleted.',
          type: 'success',
          confirmButtonClass: 'mat-raised-button',
          buttonsStyling: false
        });
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          type: 'error',
          confirmButtonClass: 'mat-raised-button',
          buttonsStyling: false
        });
      }
    });
  }
}


