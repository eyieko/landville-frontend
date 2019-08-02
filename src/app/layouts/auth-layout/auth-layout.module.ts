import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';

import {AuthLayoutRoutes} from './auth-layout.routing';
import {LoginComponent} from '../../pages/login/login.component';
import { LoginFormComponent } from '../../pages/login/login-form/login-form.component';
import { LoginHeaderComponent } from '../../pages/login/login-header/login-header.component';
import { LoginSliderComponent } from '../../pages/login/login-slider/login-slider.component';
import { SocialLoginComponent } from '../../pages/login/social-login/social-login.component';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { RegisterFormComponent } from 'src/app/pages/registration/register-form/register-form.component';
import { RegisterHeaderComponent } from 'src/app/pages/registration/register-header/register-header.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasswordResetComponent } from 'src/app/pages/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from 'src/app/pages/enter-reset-password/enter-reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ComponentsModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginHeaderComponent,
    LoginSliderComponent,
    SocialLoginComponent,
    LoginComponent,
    RegistrationComponent,
    RegisterFormComponent,
    RegisterHeaderComponent,
    HomeComponent
  ]
})
export class AuthLayoutModule {}
