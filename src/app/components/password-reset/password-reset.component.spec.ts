import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnterResetPasswordComponent } from '../enter-reset-password/enter-reset-password.component';
import { resetLinkService } from 'src/helpers/spies';
import { of, throwError } from 'rxjs';
import { PasswordResetService } from 'src/app/services/password-reset.service';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetComponent,
        EnterResetPasswordComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: PasswordResetService, useValue: resetLinkService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('Should call the onSubmit method when the button is clicked', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
    }));

  it('should be invalid', async(() => {
      component.resetForm.get('email').setValue('');
      expect(component.resetForm.valid).toBeFalsy();
    }));

  it('should be valid', async(() => {
      component.resetForm.get('email').setValue('joel@gmail.com');
      expect(component.resetForm.valid).toBeTruthy();
    }));

  it('Should send a reset link', async(() => {
      const response = {
        data: {
          message : "If you have an account with us we have sent an email to reset your password"
        }
      };
      resetLinkService.getResetLink.and.returnValue(of(response));
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', response);

      expect(component.loading).toEqual(true);
    }));

  it('Should throw an error', async(() => {
      const errorResponse = {
        errors: {
            email: [
                "Enter a valid email address."
            ]
        }
    };
      resetLinkService.getResetLink.and.returnValue(throwError(
        errorResponse
      ));
      component.onSubmit();
      expect(component.loading).toEqual(false);

    }));

});
