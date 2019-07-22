import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form.component';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { LoginSliderComponent } from '../login-slider/login-slider.component';
import { SocialLoginComponent } from '../social-login/social-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from 'src/app/services/login/login.service';

const loginData = {
  "email": "client1@testing.com",
  "password": "Idfwu8080!"
}

const todosServiceStub = {
  get() {
    const todos = [{id: 1}];
    return of( todos );
  }
};

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [
        LoginFormComponent,
        LoginHeaderComponent,
        LoginSliderComponent,
        SocialLoginComponent,
      ],
      providers: [{provide: LoginService, useValue: todosServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
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

  it('should have invalid password field if empty', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();
  });
});
