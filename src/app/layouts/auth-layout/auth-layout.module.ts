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
    SocialLoginComponent
  ],
})
export class AuthLayoutModule {
}
