import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoginFormComponent } from './login-form.component';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { LoginSliderComponent } from '../login-slider/login-slider.component';
import { SocialLoginComponent } from '../social-login/social-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from 'src/app/services/login/login.service';
import { loginServiceSpy, resetSpies, toastServiceSpy } from '../../../helpers/spies';

const loginError = {
  errors: {
      invalid: [
          "invalid email and password combination"
      ]
  }
}

const loginData = {
  email: "client1@testing.com",
  password: "Idfwu8080!"
}
const loginResponse = {

    data: {
        user: {
            email: "client1@testing.com",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZW1haWwiOiJjbGllbnQxQHRlc3RpbmcuY29tIiwiZXhwIjoxNTYzODc5MzQwfQ.USqawLLbtHZsWaykh9oeWs0tjrWkp-gIXErp4sFW2NY"
        },
        message: "You have successfully logged in",
        status: "success"
    }
}
describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  
  beforeAll(() => resetSpies([loginServiceSpy]));
  afterEach(() => resetSpies([loginServiceSpy]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        LoginFormComponent,
        LoginHeaderComponent,
        LoginSliderComponent,
        SocialLoginComponent,
      ],
      providers: [{provide: LoginService, useValue: loginServiceSpy},
        {provide: ToastrService, useValue: toastServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login a user successfully', () => {
    const { email, password } = component.loginForm.controls;
    email.setValue('testemail@email.com');
    password.setValue('password');
    loginServiceSpy.login.and.returnValue(of(loginResponse));
    component.onLogin(loginData);
    expect(toastServiceSpy.success).toHaveBeenCalledWith(loginResponse.data.message);
  })

  it('should throw an error in case of wrong details', () => {
    const { email, password } = component.loginForm.controls;
    email.setValue('testemail@email.com');
    password.setValue('password');
    loginServiceSpy.login.and.returnValue(throwError(
      loginError
    ));
    component.onLogin(loginData);
    expect(toastServiceSpy.error).toHaveBeenCalledWith('Invalid email and password combination');
  })
  it('should call login method', () => {
    component.onLogin(loginData)
    expect(component.success).toBeFalsy()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have invalid email field if empty', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
  });

  it('should be valid for email if email is passed', () => {
    const email = component.loginForm.controls.email;
    email.setValue('someemail@email.com');
    expect(email.valid).toBeTruthy();
  });

  it('an invalid form passed', () => {
    const email = component.loginForm.controls.email;
    email.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should have invalid password field if empty', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();
  });
});
