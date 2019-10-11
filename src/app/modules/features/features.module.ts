import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CommonLayoutRoutes } from 'src/app/modules/features/features.routing';
import { CompanyComponent } from 'src/app/modules/features/components/company/company.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ProfileModule } from 'src/app/modules/features/components/profile/profile.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { DepositsComponent } from 'src/app/modules/features/components/deposits/deposits.component';
import { ClientsComponent } from 'src/app/modules/features/components/clients/clients.component';
import { TokenizedCardComponent } from 'src/app/modules/features/components/payment/tokenized-card/tokenized-card.component';
import { PinValidateComponent } from 'src/app/modules/features/components/payment/pin-validate/pin-validate.component';
import { PinPaymentComponent } from 'src/app/modules/features/components/payment/pin-payment/pin-payment.component';
import { InternationalPaymentComponent } from 'src/app/modules/features/components/payment/international-payment/international-payment.component';
import { InternationalPaymentStatusComponent } from 'src/app/modules/features/components/payment/international-payment-status/international-payment-status.component';
import { SavingsComponent } from './components/savings/savings.component';

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
    ChartsModule
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
    SavingsComponent
  ],
  providers: [ProfileService, LocalStorageService, Title]
})
export class FeaturesModule {}
