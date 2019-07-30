import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {ComponentsModule} from './components/components.module';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './pages/enter-reset-password/enter-reset-password.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    CommonLayoutComponent,
    PasswordResetComponent,
    EnterResetPasswordComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
