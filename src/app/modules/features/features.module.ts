import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CommonLayoutRoutes } from 'src/app/modules/features/features.routing';
import { CompanyComponent } from 'src/app/modules/features/components/company/company.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ProfileModule } from 'src/app/modules/features/components/profile/profile.module';
import { NoPropertiesComponent } from 'src/app/components/properties/no-properties/no-properties.component';
import { RegistersuccessComponent } from 'src/app/modules/authentication/components/registration/registersuccess/registersuccess.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { CardComponent } from 'src/app/modules/shared/components/card/card.component';
import { DepositsComponent } from 'src/app/modules/features/components/deposits/deposits.component';
import { ClientsComponent } from 'src/app/modules/features/components/clients/clients.component';
import { PropertyDetailsComponent } from '../../components/property-details/property-details.component';
import { PropertyDetailComponent } from '../../components/property-details/property-detail/property-detail.component';
import { ClientAdminComponent } from '../../components/property-details/client-admin/client-admin.component';
import { PropertyDescriptionComponent } from '../../components/property-details/property-description/property-description.component';
import { TokenizedCardComponent } from './components/payment/tokenized-card/tokenized-card.component';
import { PinValidateComponent } from './components/payment/pin-validate/pin-validate.component';
import { PinPaymentComponent } from './components/payment/pin-payment/pin-payment.component';
import { InternationalPaymentComponent } from './components/payment/international-payment/international-payment.component';
import { InputErrorsComponent } from '../shared/input-errors/input-errors.component';
import {
  InternationalPaymentStatusComponent
} from "./components/payment/international-payment-status/international-payment-status.component";

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
  ],
  declarations: [
    HomeComponent,
    CompanyComponent,
    DepositsComponent,
    ClientsComponent,
    InternationalPaymentStatusComponent,
    TokenizedCardComponent,
    PinValidateComponent,
    PinPaymentComponent,
    InternationalPaymentComponent,
  ],
  providers: [ProfileService, LocalStorageService, Title]
})
export class FeaturesModule { }
