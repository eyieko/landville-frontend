import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  inputError: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {}


  notification: string ='Provide your username and password';
  email: boolean = true
  password: boolean = true;
  onLogin(loginData) {
    this.submitted = true;
    console.log(this.loginForm)
    if(this.loginForm.invalid){
      this.notification = 'Error, the fields must not  empty';
      this.setClass()
      return;
    }
    this.success = true;

    console.log(loginData);
    this.loginService.login(loginData).subscribe(login => {
      console.log(login)
      this.notification = 'Login was succesful';
      this.router.navigate([''])
    }, error => {
      this.notification = 'Error, no user with such username and password found';
      this.setClass()
    })
    
  }
  setClass() {
    this.inputError = true;
    setTimeout(function(){
      this.inputError = false;
    }, 10000);
  }
  
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
