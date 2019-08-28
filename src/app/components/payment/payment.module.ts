import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InternationalPaymentStatusComponent } from 'src/app/components/payment/international-payment-status/international-payment-status.component';
import { InternationalPaymentComponent } from 'src/app/components/payment/international-payment/international-payment.component';
import { PinPaymentComponent } from 'src/app/components/payment/pin-payment/pin-payment.component';
import { PinValidateComponent } from 'src/app/components/payment/pin-validate/pin-validate.component';
import { TokenizedCardComponent } from 'src/app/components/payment/tokenized-card/tokenized-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { paymentRoutes } from './payment.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(paymentRoutes),
    HttpClientModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    SharedModule,
  ],
  declarations:
    [ TokenizedCardComponent,
      PinValidateComponent,
      PinPaymentComponent,
      InternationalPaymentComponent,
      InternationalPaymentStatusComponent,
    ],

})
export class PaymentModule {
}
