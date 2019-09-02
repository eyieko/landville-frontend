import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginData } from 'src/app/models';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;
  inputError = false;
  returnUrl: string;
  notification = 'Provide your email and password';
  email = true;
  password = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }

  onLogin(loginData: LoginData) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toastrService.error('Error, ensure you provide valid details in the fields before sign in');
      this.setErrorTimeout();
      return;
    }
    if (this.loginForm.value.email === '') {
      this.toastrService.error('Please fill all details before sign in');
      return;
    }
    this.success = true;
    this.spinner.show();

    this.loginService.login(loginData).subscribe(response => {
      this.spinner.hide();
      this.toastrService.success(response.data.message);
      this.notification = 'Login was succesful';
      localStorage.setItem('token', response.data.user.token);
      const to = this.route.snapshot.queryParams ? this.route.snapshot.queryParams.next : 'home';
      this.router.navigate([`${to}`]);
    }, error => {
      this.spinner.hide();
      this.toastrService.error('Invalid email and password combination');
      this.setErrorTimeout();
    });

  }

  setErrorTimeout() {
    this.inputError = true;
    setTimeout(() => {
      this.inputError = false;
      this.notification = 'Provide your email and password';
    }, 3000);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

  }

}
