import { TokenizedCardComponent } from './tokenized-card.component';
import { PinValidateComponent } from './pin-validate.component';
import { PinPaymentComponent } from './pin-payment.component';
import { Routes } from '@angular/router';
import { InternationalPaymentComponent } from './international-payment/international-payment.component';


export const paymentRoutes: Routes = [
    { path: 'payment/pin', component: PinPaymentComponent },
    { path: 'validate-pin/:flwRef/:purpose', component: PinValidateComponent },
    { path: 'payment/saved-card', component: TokenizedCardComponent },
    { path: 'payment/international', component: InternationalPaymentComponent },
];
