import { paymentRoutes } from './payment.routing';
import { PinPaymentComponent } from './pin-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PinValidateComponent } from './pin-validate.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TokenizedCardComponent } from './tokenized-card.component';


@NgModule({
  declarations: [PinPaymentComponent, PinValidateComponent, TokenizedCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(paymentRoutes),
    HttpClientModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
  ]
})
export class PaymentModule { }
