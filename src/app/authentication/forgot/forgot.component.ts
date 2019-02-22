import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import Swal from 'sweetalert2';
declare var $: any;



import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  email: string;

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }


  resetPassword() {
    this.email = (document.getElementById('email') as HTMLInputElement).value;
    this.auth.resetPassword(this.email);
  }
  showSwal(type) {
    console.log('Button has been pressed.');

    this.resetPassword();
    Swal.fire({
      title: 'Email has been sent',
      text: 'Within a couple of minutes you should receive an email with instructions on how to recover your password for Stinger.',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success'
    });
  }
}
