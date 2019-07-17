import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AuthLayoutRoutes} from './auth-layout.routing';
import {LoginComponent} from '../../pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
})
export class AuthLayoutModule {
}
