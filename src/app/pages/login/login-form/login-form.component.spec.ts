import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
