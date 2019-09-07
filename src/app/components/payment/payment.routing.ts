import { Routes } from '@angular/router';
import { InternationalPaymentStatusComponent } from 'src/app/components/payment/international-payment-status/international-payment-status.component';
import { PinPaymentComponent } from 'src/app/components/payment/pin-payment/pin-payment.component';
import { PinValidateComponent } from 'src/app/components/payment/pin-validate/pin-validate.component';
import { TokenizedCardComponent } from 'src/app/components/payment/tokenized-card/tokenized-card.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InternationalPaymentComponent } from './international-payment/international-payment.component';


export const paymentRoutes: Routes = [
  { path: 'payment/pin', component: PinPaymentComponent, canActivate: [ AuthGuard ] },
  { path: 'validate-pin/:flwRef/:purpose', component: PinValidateComponent, canActivate: [ AuthGuard ] },
  { path: 'payment/saved-card', component: TokenizedCardComponent, canActivate: [ AuthGuard ] },
  { path: 'payment/international', component: InternationalPaymentComponent, canActivate: [ AuthGuard ] },
  { path: 'payment/international/status', component: InternationalPaymentStatusComponent },
];
