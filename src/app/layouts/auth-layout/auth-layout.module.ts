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
import { RegistrationComponent } from '../../pages/registration/registration.component';
import { RegisterFormComponent } from '../../pages/registration/register-form/register-form.component';
import { RegisterHeaderComponent } from '../../pages/registration/register-header/register-header.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginHeaderComponent,
    LoginSliderComponent,
    SocialLoginComponent,
    NgxSpinnerModule,
    LoginComponent,
    RegistrationComponent,
    RegisterFormComponent,
    RegisterHeaderComponent,

  ],
})
export class AuthLayoutModule {
}
