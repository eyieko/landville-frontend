import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { SocialLoginComponentt } from './socialauth.component';
import { AuthService, SocialUser } from 'angularx-social-login';
import {
  authServiceSpy,
  loginServiceSpy,
  resetSpies
} from 'src/app/helpers/social.spies';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLayoutRoutes } from 'src/app/layouts/auth-layout/auth-layout.routing';
import { LoginService } from 'src/app/services/SocialAuth/socialauth.service';
import { of, Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

const userData: SocialUser = {
  id: '123',
  name: 'Kelvin Onkundi',
  email: 'kelvin.onkundi@andela.com',
  photoUrl: 'www.photo.com',
  firstName: 'Kelvin',
  authToken: 'a29',
  idToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0ZjI5NGM0NTE2MDA4OGQwNzlmZWU2ODEzOGY1MjEzM2QzZTIyOGMiLCJ0eXAiOiJKV1QifQ.',
  lastName: 'Onkundi',
  provider: 'GOOGLE',
  authorizationCode: 'sjsksj'
};

describe('SocialLoginComponentt', () => {
  let component: SocialLoginComponentt;
  let fixture: ComponentFixture<SocialLoginComponentt>;
  let service: LoginService;

  beforeAll(() => resetSpies([loginServiceSpy]));

  afterEach(() => resetSpies([loginServiceSpy]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialLoginComponentt, LoginComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(AuthLayoutRoutes),
        NgxSpinnerModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LoginService, usevalue: loginServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponentt);
    component = fixture.componentInstance;
    service = TestBed.get(LoginService);
    fixture.detectChanges();
  });

  it('should be able to sign with google', () => {
    let authdata = authServiceSpy.signIn.and.returnValue(
      new Promise(resolve => resolve(userData))
    );
    authServiceSpy.signIn.and.returnValue(
      new Promise(reject => reject(userData))
    );

    loginServiceSpy.createGoogleUser.and.returnValue(of(userData.idToken));

    spyOn(component, 'signInWithGoogle').and.callThrough();
    let button = fixture.debugElement.query(By.css('.google'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signInWithGoogle).toHaveBeenCalled();
  });

  it('should be able to sign in with facebook', () => {
    authServiceSpy.signIn.and.returnValue(
      new Promise(resolve => resolve(userData))
    );
    authServiceSpy.signIn.and.returnValue(
      new Promise(reject => reject(userData))
    );
    loginServiceSpy.createFacebookUser.and.returnValue(of(userData.idToken));
    fixture.detectChanges();

    spyOn(component, 'signInWithFB').and.callThrough();

    let button = fixture.debugElement.query(By.css('.facebook'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.signInWithFB).toHaveBeenCalled();
  });
});
