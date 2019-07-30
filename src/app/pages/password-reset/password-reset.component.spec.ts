import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { EnterResetPasswordComponent } from '../enter-reset-password/enter-reset-password.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordResetService } from 'src/app/services/password/password-reset.service';
import { resetLinkService } from 'src/app/helpers/spies';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from 'src/app/layouts/common-layout/common-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DebugElement } from '@angular/core';
import { throwError, of } from 'rxjs';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetComponent,
        EnterResetPasswordComponent,
        AuthLayoutComponent,
        CommonLayoutComponent,

      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ComponentsModule,

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
    expect(component).toBeTruthy();
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
