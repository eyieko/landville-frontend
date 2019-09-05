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
import { LoginFormComponent } from 'src/app/authentication/components/login/login-form/login-form.component';
import { LoginHeaderComponent } from 'src/app/authentication/components/login/login-header/login-header.component';
import { LoginSliderComponent } from 'src/app/authentication/components/login/login-slider/login-slider.component';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';
import { RegisterFormComponent } from 'src/app/authentication/components/registration/register-form/register-form.component';
import { RegisterHeaderComponent } from 'src/app/authentication/components/registration/register-header/register-header.component';
import { RegistrationComponent } from 'src/app/authentication/components/registration/registration.component';
import { SocialLoginComponentt } from 'src/app/authentication/components/SocialAuth/socialauth.component';
import { AuthLayoutRoutes } from './authentication.routing';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';

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
    SocialLoginComponentt,
    PasswordResetComponent
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthenticationModule {
}
