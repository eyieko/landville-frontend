import { TokenizedCardComponent } from './tokenized-card.component';
import { PinValidateComponent } from './pin-validate.component';
import { PinPaymentComponent } from './pin-payment.component';
import { Routes } from '@angular/router';
import { InternationalPaymentComponent } from './international-payment/international-payment.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


export const paymentRoutes: Routes = [
    { path: 'payment/pin', component: PinPaymentComponent, canActivate: [AuthGuard] },
    { path: 'validate-pin/:flwRef/:purpose', component: PinValidateComponent, canActivate: [AuthGuard] },
    { path: 'payment/saved-card', component: TokenizedCardComponent, canActivate: [AuthGuard] },
    { path: 'payment/international', component: InternationalPaymentComponent, canActivate: [AuthGuard] },
];
