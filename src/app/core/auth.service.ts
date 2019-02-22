import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotifyService } from './notify.service';


import * as firebase from 'firebase';
import * as faker from 'faker';


import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { User } from './user';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Person } from './customer';



@Injectable({ providedIn: 'root' })

export class AuthService {

  user$: Observable<User>;
  employeeUser: Observable<any>;
  customerUser: Observable<any>;
  userId: string = null;
  error: string = null;
  dateAdded: string;
  customer$: Observable<Person>;


  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    public snackBar: MatSnackBar,
    private toastr: ToastrService) {


    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.afs.doc<User>(`employees/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }



  //// Email/Password Auth ////
  emailLogin(email, pass) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(credential => {
        this.showSuccess();
        // this.updateUserData(credential.user);
        console.log(credential.user);
        this.userId = credential.user.uid;
        this.router.navigate(['/home']);
        // return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));

  }


  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        this.router.navigate(['/employees']);
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  // Get Data
  getEmployee() {
    this.employeeUser = this.afs.doc(`employees/${this.userId}`).valueChanges();
    console.log('GET CALL ON USER ', this.userId, this.employeeUser);
    return this.employeeUser;
  }

  getCustomer() {
    this.customerUser = this.afs.doc(`customers/${this.userId}`).valueChanges();
    console.log('GET CALL ON CUSTOMER ', this.userId, this.customerUser);
    return this.customerUser;
  }


  // Returns true if user is logged in
  isLoggedIn() {
    if (this.userId == null) {
      return false;
    } else {
      return true;
    }

  }
  // Test

  // Reset user password

  public resetPassword(email: string) {
    const auth = this.afAuth.auth;
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
        .catch(function () {
          console.log('Got an error: ' + Error);
        });
      console.log('Logged out');

    });
  }

  // If error, console log and notify user

  private handleError(error: Error) {
    this.toastr.error('Username or password was incorrect', 'Login Failed');
    // console.error(error);


  }

  // Sets user data to firestore after succesful login
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`employees/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ', // Use new Shorter - When done delete this..
      roles: {
        analyst: true
      },
      dateCreated: user.dateCreated || firebase.firestore.Timestamp.now()
    };
    return userRef.set(data, { merge: true });
  }

  public deleteCustomer(data) {
    const custRef: AngularFirestoreDocument<Person> = this.afs.doc(`customers/${data.uid}`);
    console.log('THIS USER: ', data.id);
  }



  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      for (const role of allowedRoles) {
        if (user.roles[role]) {
          return true;
        }
      }
      return false;
    }


  }

  formatDate(date: Date): string {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${year} -${month}-${day}`;
  }

  // Toastr Notification
  showSuccess() {
    this.toastr.success('Welcome to Stinger', 'Login Successfull', {
      closeButton: true
    });
  }
  showError() {
    this.toastr.error('Username or password is incorrect', 'Login Failed', {
      closeButton: true
    });
  }

  // Dummy User Data Generator
  fakeNews() {
    const genders = ['female', 'male'];
    const hacker = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.random.number({ min: 18, max: 60 }),
      email: faker.internet.email(),
      phrase: faker.hacker.phrase(),
      uid: faker.random.alphaNumeric(16),
      latitude: faker.address.latitude(-90, 90),
      longtitude: faker.address.longitude(-180, 180),
      avatar: faker.image.avatar(),
      dateCreated: firebase.firestore.Timestamp.now(),
      country: faker.address.country(),
      countryCode: faker.address.countryCode(),
      city: faker.address.state(),
      followers: faker.random.number({ min: 1, max: 1548324 }),
      gender: faker.random.arrayElement(genders)
    };
    this.afs.collection('customers').doc(hacker.uid).set(hacker);
  }

}
