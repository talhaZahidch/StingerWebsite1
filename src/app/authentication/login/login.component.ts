import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../core/auth.service';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )] ,
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );

  }

  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.uname;
    const pass = this.loginForm.value.password;

    this.auth.emailLogin(email, pass);

  }

  login() {
    this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']);
  }


}
