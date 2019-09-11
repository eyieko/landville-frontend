import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialLoginComponentt } from 'src/app/modules/authentication/components/SocialAuth/socialauth.component';
import { AuthService } from 'angularx-social-login';
import { authServiceSpy, loginServiceSpy, resetSpies } from 'src/app/helpers/tests/social.spies';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLayoutRoutes } from 'src/app/modules/authentication/authentication.routing';
import { LoginService } from 'src/app/services/SocialAuth/socialauth.service';
import {of, throwError} from 'rxjs';
import { LoginComponent } from 'src/app/modules/authentication/components/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistrationComponent } from 'src/app/modules/authentication/components/registration/registration.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PasswordResetComponent } from 'src/app/modules/authentication/components/password-reset/password-reset.component';
import {
  EnterResetPasswordComponent
} from 'src/app/modules/authentication/components/enter-reset-password/enter-reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { userData } from 'src/app/helpers/tests/mocks';

describe('SocialLoginComponentt', () => {
  let component: SocialLoginComponentt;
  let fixture: ComponentFixture<SocialLoginComponentt>;
  let service: LoginService;

  beforeAll(() => resetSpies([loginServiceSpy, authServiceSpy]));
  afterEach(() => resetSpies([loginServiceSpy, authServiceSpy]));

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialLoginComponentt,
        LoginComponent,
        RegistrationComponent,
        EnterResetPasswordComponent,
        PasswordResetComponent,
        HomeComponent
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(AuthLayoutRoutes),
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: LoginService, useValue: loginServiceSpy}
      ]
    }).compileComponents().then(r => {});
   });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponentt);
    component = fixture.componentInstance;
    service = TestBed.get(LoginService);
    fixture.detectChanges();
  });

  it('should be able to sign with google', () => {
    authServiceSpy.signIn.and.returnValue(new Promise((resolve) => resolve(userData)));
    authServiceSpy.signIn.and.returnValue(new Promise((reject) => reject(userData)));
    loginServiceSpy.createGoogleUser.and.returnValue(of(userData.idToken));
    fixture.detectChanges();

    spyOn(component, 'signInWithGoogle').and.callThrough();

    const button = fixture.debugElement.query(By.css('.google'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signInWithGoogle).toHaveBeenCalled();
  });

  it('should be able to sign in with facebook', () => {
    authServiceSpy.signIn.and.returnValue(new Promise((resolve) => resolve(userData)));
    authServiceSpy.signIn.and.returnValue(new Promise((reject) => reject(userData)));
    loginServiceSpy.createFacebookUser.and.returnValue(of(userData.idToken));
    fixture.detectChanges();

    spyOn(component, 'signInWithFB').and.callThrough();

    const button = fixture.debugElement.query(By.css('.facebook'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signInWithFB).toHaveBeenCalled();
  });
});
