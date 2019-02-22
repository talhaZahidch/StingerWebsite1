import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs';

import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { MatTableDataSource, MatSort, MatDialog, MatPaginator, MatSnackBar } from '@angular/material';
import { AuthService } from '../../core/auth.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})



export class EmployeesComponent implements AfterViewInit, OnInit {


  displayedColumns = ['name', 'displayname', 'email', 'phoneno', 'edit'];
  dataSource: MatTableDataSource<any>;
  userForm: FormGroup;
  source: LocalDataSource;




  @ViewChild(MatSort) sort: MatSort;

  constructor(private afs: AngularFirestore,
    public dialog: MatDialog, private fb: FormBuilder, private auth: AuthService, public snackBar: MatSnackBar) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.afs.collection<any>('employees').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  settings = tableData.settings;
  settings2 = tableData.settings2;

  ngAfterViewInit() {
    // this.afs.collection<any>('employees').valueChanges().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.sort = this.sort;
    // });
  }

  ngOnInit() {
    this.buildForm();
  }

  signup() {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  buildForm() {
    this.userForm = this.fb.group({
      'displayName': ['', [
        Validators.required,
      ]],
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  openDialog(data): void {
    const dialogRef = this.dialog.open(EditComponent, {

      data: data
    });
  }
}


