import { Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/modules/features/components/company/company.component';
import { ProfileComponent } from 'src/app/modules/features/components/profile/profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DepositsComponent } from 'src/app/modules/features/components/deposits/deposits.component';
import { ClientsComponent } from 'src/app/modules/features/components/clients/clients.component';
import { PinPaymentComponent } from 'src/app/modules/features/components/payment/pin-payment/pin-payment.component';
import { PinValidateComponent } from 'src/app/modules/features/components/payment/pin-validate/pin-validate.component';
import { TokenizedCardComponent } from 'src/app/modules/features/components/payment/tokenized-card/tokenized-card.component';
import {
  InternationalPaymentComponent
} from 'src/app/modules/features/components/payment/international-payment/international-payment.component';
import {
  InternationalPaymentStatusComponent
} from 'src/app/modules/features/components/payment/international-payment-status/international-payment-status.component';
import { ReviewComponent } from 'src/app/modules/features/components/client-review/review.component';
export const CommonLayoutRoutes: Routes = [
  {
    path: 'create-company',
    component: CompanyComponent,
    data: {
      title: 'Create Partner Company'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'User Profile'
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'user/deposits',
    component: DepositsComponent,
    data: {
      title: 'My Deposits',
      tags: [],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: {
      title: 'Client companies',
      tags: [],
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/pin',
    component: PinPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'validate-pin/:flwRef/:purpose',
    component: PinValidateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/saved-card',
    component: TokenizedCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/international',
    component: InternationalPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/international/status',
    component: InternationalPaymentStatusComponent,
  },
  {
    path: 'client/:clientId/review',
    component: ReviewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Review client',
      tags: []
    }
  }
];
