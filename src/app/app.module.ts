import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetService } from './services/password-reset.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PasswordResetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
