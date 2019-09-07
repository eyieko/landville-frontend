import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { CompanyComponent } from 'src/app/components/company/company.component';
import { DepositsComponent } from 'src/app/components/deposits/deposits.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PaymentModule } from 'src/app/components/payment/payment.module';
import { ProfileModule } from 'src/app/components/profile/profile.module';
import { NoPropertiesComponent } from 'src/app/components/properties/no-properties/no-properties.component';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { PropertyDetailsModule } from 'src/app/components/property-details/property-details.module';
import { RegistersuccessComponent } from 'src/app/components/registration/registersuccess/registersuccess.component';
import { CommonLayoutRoutes } from 'src/app/layouts/common-layout/common-layout.routing';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommonLayoutRoutes),
    SharedModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
    PaymentModule,
    PropertyDetailsModule
  ],
  declarations: [
    HomeComponent,
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    DepositsComponent,
    ClientsComponent
  ],
  providers: [ ProfileService, Title ],
})
export class CommonLayoutModule {
}
