import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { resetPassordService, toastServiceSpy } from 'src/app/helpers/spies';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from 'src/app/layouts/common-layout/common-layout.component';
import { InternationalPaymentStatusComponent } from 'src/app/pages/payment/international-payment-status/international-payment-status.component';
import { EnterResetPasswordService } from 'src/app/services/password/enter-reset-password.service';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

import { EnterResetPasswordComponent } from './enter-reset-password.component';

describe('EnterResetPasswordComponent', () => {
  let component: EnterResetPasswordComponent;
  let fixture: ComponentFixture<EnterResetPasswordComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetComponent,
        EnterResetPasswordComponent,
        AuthLayoutComponent,
        CommonLayoutComponent,
        InternationalPaymentStatusComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ComponentsModule,
        NgxSpinnerModule,

      ],
      providers: [
        {
          provide: EnterResetPasswordService, useValue: resetPassordService
        },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create EnterResetPasswordComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the onSubmit method when the button is clicked', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));


  it('should be invalid when password is not set', async(() => {
    component.enterPasswordForm.get('newPassword').setValue('');
    component.enterPasswordForm.get('confirmPassword').setValue('');
    expect(component.enterPasswordForm.valid).toBeFalsy();
  }));

  it('should be invalid when provided password is too common', async(() => {
    component.enterPasswordForm.get('newPassword').setValue('123456');
    component.enterPasswordForm.get('confirmPassword').setValue('123456');
    expect(component.enterPasswordForm.valid).toBeTruthy();
  }));

  it('should be valid when password is provided', async(() => {
    component.enterPasswordForm.get('newPassword').setValue('confirmPassword');
    component.enterPasswordForm.get('confirmPassword').setValue('confirmPassword');
    expect(component.enterPasswordForm.valid).toBeTruthy();
  }));

  it('Should get a backend response when password is provided', async(() => {
    const response = {
      data: {
        message: 'If you have an account with us we have sent an email to reset your password'
      }
    };
    resetPassordService.changePassword.and.returnValue(of(response));
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', response);

    expect(component.success).toEqual(true);
  }));

  it('Should throw an error when email is invalid', async(() => {
    const errorResponse = {
      errors: {
        email: [ 'Enter a valid email address.' ]
      }
    };
    resetPassordService.changePassword.and.returnValue(throwError(
      errorResponse
    ));
    component.onSubmit();
    expect(component.success).toEqual(false);
  }));
});
