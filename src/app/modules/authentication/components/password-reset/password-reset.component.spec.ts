import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  PasswordResetComponent
} from 'src/app/modules/authentication/components/password-reset/password-reset.component';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password/password-reset.service';
import { resetLinkServiceSpy, toastServiceSpy } from 'src/app/helpers/tests/spies';
import { AuthenticationComponent } from 'src/app/modules/authentication/authentication.component';
import { FeaturesComponent } from 'src/app/modules/features/features.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { throwError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TermsPageComponent } from 'src/app/components/terms/terms.component';
import {
  RegistersuccessComponent
} from 'src/app/modules/authentication/components/registration/registersuccess/registersuccess.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { NoPropertiesComponent } from 'src/app/components/properties/no-properties/no-properties.component';
import { configureTestSuite } from 'ng-bullet';
import { passwordResetMock, passwordResetResponse } from 'src/app/helpers/tests/mocks';
import { resetSpies } from 'src/app/helpers/tests/social.spies';
import { ClientReviewsComponent } from 'src/app/components/client-reviews/client-reviews.component';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let el: DebugElement;

  beforeAll(() => resetSpies([toastServiceSpy, resetLinkServiceSpy]));
  afterEach(() => resetSpies([toastServiceSpy, resetLinkServiceSpy]));

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordResetComponent,
        AuthenticationComponent,
        FeaturesComponent,
        TermsPageComponent,
        RegistersuccessComponent,
        HomeComponent,
        PropertiesComponent,
        PropertyDetailsComponent,
        NoPropertiesComponent,
        ClientReviewsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: PasswordResetService, useValue: resetLinkServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    })
      .compileComponents().then(r => {});
   });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PasswordResetComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the onSubmit method when the button is clicked', (() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('should be invalid when email is not provided', (() => {
    component.resetForm.get('email').setValue('');
    expect(component.resetForm.valid).toBeFalsy();
  }));

  it('should be valid when a valid email is provided', (() => {
    component.resetForm.get('email').setValue('joel@gmail.com');
    expect(component.resetForm.valid).toBeTruthy();
  }));

  it('Should get a backend response when a valid email is provided', (() => {
    resetLinkServiceSpy.getResetLink.and.returnValue(of(passwordResetResponse));
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', passwordResetResponse);
    expect(component.success).toEqual(true);
  }));

  it('Should throw an error when an invalid email is provided', (() => {
    resetLinkServiceSpy.getResetLink.and.returnValue(throwError(passwordResetMock));
    component.onSubmit();
    expect(component.success).toEqual(false);
  }));

});
