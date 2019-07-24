import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { LoginData } from '../../../models/login/loginData';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    ){}


  notification: string ='Provide your email and password';
  email: boolean = true
  password: boolean = true;
  
  onLogin(loginData: LoginData) {
    this.submitted = true;
    if(this.loginForm.invalid){
      this.notification = 'Error, ensure you provide valid details';
      this.setErrorTimeout()
      return;
    }
    this.success = true;

    this.loginService.login(loginData).subscribe(response => {
      this.toastrService.success(response.data.message);
      this.notification = 'Login was succesful';
      localStorage.setItem('token', response.data.user.token)

      this.router.navigate([''])
    }, error => {
      this.toastrService.error('Invalid email and password combination');
      this.notification = 'Error, no user with such email and password found';
      this.setErrorTimeout()
      
    })
    
  }
  setErrorTimeout(){
    this.inputError = true;
      setTimeout(() => {
        this.inputError = false;
        this.notification = 'Provide your email and password';
      }, 3000)
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

}
