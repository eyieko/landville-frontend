import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';

import { SocialLoginComponentt } from 'src/app/components/SocialAuth/socialauth.component';
import { authServiceSpy, loginServiceSpy, resetSpies } from 'src/app/helpers/social.spies';
import { AuthLayoutRoutes } from 'src/app/layouts/auth-layout/auth-layout.routing';

const userData: SocialUser = {
  id: '123',
  name: 'Kelvin Onkundi',
  email: 'kelvin.onkundi@andela.com',
  photoUrl: 'www.photo.com',
  firstName: 'Kelvin',
  authToken: 'a29',
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg0ZjI5NGM0NTE2MDA4OGQwNzlmZWU2ODEzOGY1MjEzM2QzZTIyOGMiLCJ0eXAiOiJKV1QifQ.',
  lastName: 'Onkundi',
  provider: 'GOOGLE',
  authorizationCode: 'sjsksj'
};

describe('SocialLoginComponentt', () => {
  let component: SocialLoginComponentt;
  let fixture: ComponentFixture<SocialLoginComponentt>;
  let service: AuthService;

  beforeAll(() => resetSpies([ loginServiceSpy ]));

  afterEach(() => resetSpies([ loginServiceSpy ]));

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ SocialLoginComponentt, LoginComponent, RegistrationComponent, HomeComponent ],
        imports: [
          HttpClientTestingModule,
          ToastrModule.forRoot(),
          RouterTestingModule.withRoutes(AuthLayoutRoutes),
          NgxSpinnerModule
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        providers: [
          { provide: AuthService, useValue: authServiceSpy },
          { provide: AuthService, usevalue: loginServiceSpy }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponentt);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should be able to sign with google', () => {
    const authdata = authServiceSpy.signIn.and.returnValue(new Promise((resolve) => resolve(userData)));
    authServiceSpy.signIn.and.returnValue(new Promise((reject) => reject(userData)));

    loginServiceSpy.createGoogleUser.and.returnValue(of(userData.idToken));

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
