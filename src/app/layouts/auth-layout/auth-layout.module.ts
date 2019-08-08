import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angularx-social-login';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { APPCONFIG } from 'src/app/config';
import { LoginFormComponent } from 'src/app/pages/login/login-form/login-form.component';
import { LoginHeaderComponent } from 'src/app/pages/login/login-header/login-header.component';
import { LoginSliderComponent } from 'src/app/pages/login/login-slider/login-slider.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterFormComponent } from 'src/app/pages/registration/register-form/register-form.component';
import { RegisterHeaderComponent } from 'src/app/pages/registration/register-header/register-header.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';

import {} from 'src/environments/environment.prod';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService
} from 'angularx-social-login';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { SocialLoginComponentt } from 'src/app/pages/SocialAuth/socialauth.component';
import { AuthLayoutRoutes } from './auth-layout.routing';

// configs
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(APPCONFIG.googleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(APPCONFIG.facebookId)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ComponentsModule,
    SocialLoginModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginHeaderComponent,
    LoginSliderComponent,
    LoginComponent,
    RegistrationComponent,
    RegisterFormComponent,
    RegisterHeaderComponent,
    SocialLoginComponentt
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthLayoutModule {
}
