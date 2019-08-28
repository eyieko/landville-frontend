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
import { EnterResetPasswordComponent } from 'src/app/components/enter-reset-password/enter-reset-password.component';
import { LoginFormComponent } from 'src/app/components/login/login-form/login-form.component';
import { LoginSliderComponent } from 'src/app/components/login/login-slider/login-slider.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PasswordResetComponent } from 'src/app/components/password-reset/password-reset.component';
import { RegisterFormComponent } from 'src/app/components/registration/register-form/register-form.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { SocialLoginComponent } from 'src/app/components/SocialAuth/socialauth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AuthLayoutRoutes } from './auth-layout.routing';

// configs
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookId)
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
    SharedModule,
    SocialLoginModule,
  ],
  declarations: [
    PasswordResetComponent,
    EnterResetPasswordComponent,
    SocialLoginComponent,
    LoginComponent,
    LoginFormComponent,
    LoginSliderComponent,
    RegistrationComponent,
    RegisterFormComponent,
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
