import { paymentRoutes } from './payment.routing';
import { PinPaymentComponent } from './pin-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TokenizedCardComponent } from 'src/app/pages/payment/tokenized-card.component';
import { PinValidateComponent } from 'src/app/pages/payment/pin-validate.component';
import { InternationalPaymentComponent } from 'src/app/pages/payment/international-payment/international-payment.component';
import { InputErrorsComponent } from 'src/app/shared/input-errors/input-errors.component';
import { DigitOnlyModule } from '@uiowa/digit-only';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(paymentRoutes),
    HttpClientModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    DigitOnlyModule
  ],
  declarations:
    [TokenizedCardComponent,
      PinValidateComponent,
      PinPaymentComponent,
      InternationalPaymentComponent,
      InputErrorsComponent],

})
export class PaymentModule { }
