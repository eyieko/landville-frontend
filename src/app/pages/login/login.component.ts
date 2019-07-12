import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  items;
  loginForm;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onSubmit(loginData) {
    console.warn(`your data has been used to login`, loginData);
    this.loginForm.reset();
  }

  ngOnInit() {
  }

}
