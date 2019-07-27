import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetService } from './services/password-reset.service';
import { EnterResetPasswordComponent } from './components/enter-reset-password/enter-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordResetComponent,
    EnterResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PasswordResetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
