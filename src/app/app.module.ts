import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app.routing';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from 'src/app/modules/features/features.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtInterceptor } from 'src/app/interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error/error.interceptor';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EnterResetPasswordComponent } from 'src/app/modules/authentication/components/enter-reset-password/enter-reset-password.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { TermsService } from 'src/app/services/terms/terms.service';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationComponent } from 'src/app/modules/authentication/authentication.component';
import { TermsPageComponent } from 'src/app/components/terms/terms.component';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { NoPropertiesComponent } from 'src/app/components/properties/no-properties/no-properties.component';
import { FeaturesModule } from 'src/app/modules/features/features.module';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { PropertyDetailComponent } from 'src/app/components/property-details/property-detail/property-detail.component';
import { ClientAdminComponent } from 'src/app/components/property-details/client-admin/client-admin.component';
import { PropertyDescriptionComponent } from 'src/app/components/property-details/property-description/property-description.component';

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
    PropertyDescriptionComponent
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
