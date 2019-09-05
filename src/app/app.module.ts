import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { ComponentsModule } from './components/components.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { LocalStorageService } from './services/local-storage.service';
import { EnterResetPasswordComponent } from './authentication/components/enter-reset-password/enter-reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { TermsService } from './services/terms/terms.service';
import { InternationalPaymentStatusComponent } from 'src/app/features/components/payment/international-payment-status/international-payment-status.component';
import { BrowserModule } from '@angular/platform-browser';
import {AuthenticationComponent} from './authentication/authentication.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent,
    FeaturesComponent,
    EnterResetPasswordComponent,
    InternationalPaymentStatusComponent
  ],
  providers: [
    LocalStorageService,
    AuthGuard,
    NoAuthGuard,
    TermsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
