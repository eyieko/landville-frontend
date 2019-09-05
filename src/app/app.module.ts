import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { RouterModule } from '@angular/router';
import { FeaturesComponent } from './modules/features/features.component';
import { SharedModule } from './modules/shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { LocalStorageService } from './services/local-storage.service';
import {
  EnterResetPasswordComponent
} from './modules/authentication/components/enter-reset-password/enter-reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { TermsService } from './services/terms/terms.service';
import {
  InternationalPaymentStatusComponent
} from 'src/app/modules/features/components/payment/international-payment-status/international-payment-status.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { TermsPageComponent } from './components/terms/terms.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { NoPropertiesComponent } from './components/properties/no-properties/no-properties.component';
import { FeaturesModule } from './modules/features/features.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertyDetailComponent } from './components/property-details/property-detail/property-detail.component';
import { ClientAdminComponent } from './components/property-details/client-admin/client-admin.component';
import { PropertyDescriptionComponent } from './components/property-details/property-description/property-description.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AuthenticationModule,
    FeaturesModule,
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
    TermsPageComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    PropertyDetailsComponent,
    PropertyDetailComponent,
    ClientAdminComponent,
    PropertyDescriptionComponent,
  ],
  providers: [
    LocalStorageService,
    AuthGuard,
    NoAuthGuard,
    TermsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
