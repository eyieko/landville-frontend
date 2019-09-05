import { Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/modules/features/components/company/company.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RegistersuccessComponent } from 'src/app/modules/authentication/components/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/modules/features/components/profile/profile.component';
import { PropertiesComponent } from 'src/app/components/properties/properties.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoPropertiesComponent } from 'src/app/components/properties/no-properties/no-properties.component';
import { TermsPageComponent } from 'src/app/components/terms/terms.component';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { DepositsComponent } from 'src/app/modules/features/components/deposits/deposits.component';
import { ClientsComponent } from 'src/app/modules/features/components/clients/clients.component';
import { PinPaymentComponent } from './components/payment/pin-payment/pin-payment.component';
import { PinValidateComponent } from './components/payment/pin-validate/pin-validate.component';
import { TokenizedCardComponent } from './components/payment/tokenized-card/tokenized-card.component';
import { InternationalPaymentComponent } from './components/payment/international-payment/international-payment.component';
import {
  InternationalPaymentStatusComponent
} from './components/payment/international-payment-status/international-payment-status.component';

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
];
