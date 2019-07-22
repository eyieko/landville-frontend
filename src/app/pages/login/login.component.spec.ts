import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import {LoginComponent} from './login.component';

import { LoginHeaderComponent } from './login-header/login-header.component';
import { LoginSliderComponent } from './login-slider/login-slider.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { LoginFormComponent } from './login-form/login-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      declarations: [
        LoginComponent,
        LoginFormComponent,
        LoginHeaderComponent,
        LoginSliderComponent,
        SocialLoginComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
