import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { ComponentsModule } from './components/components.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LocalStorageService } from './services/local-storage.service';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './pages/enter-reset-password/enter-reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { TermsService } from './services/terms/terms.service';
import {
  InternationalPaymentStatusComponent
} from 'src/app/pages/payment/international-payment-status/international-payment-status.component';


@NgModule({
  imports: [
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
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    CommonLayoutComponent,
    PasswordResetComponent,
    EnterResetPasswordComponent,
    InternationalPaymentStatusComponent
  ],
  providers: [
    LocalStorageService, AuthGuard, NoAuthGuard, TermsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
