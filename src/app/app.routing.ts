import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FeaturesComponent } from './features/features.component';
import { PasswordResetComponent } from './authentication/components/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './authentication/components/enter-reset-password/enter-reset-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import {
  InternationalPaymentStatusComponent
} from 'src/app/features/components/payment/international-payment-status/international-payment-status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ],
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        loadChildren:
          './features/features.module#FeaturesModule'
      }
    ],
  },
  // {
  //   path: 'reset-link', data: { title: 'Reset your Password', tags: [] },
  //   component: PasswordResetComponent, canActivate: [NoAuthGuard]
  // },
  // {
  //   path: 'auth/password-reset', data: {
  //     title: 'Choose a new password', tags: []
  //   },
  //   component: EnterResetPasswordComponent, canActivate: [NoAuthGuard]
  // },
  { path: 'payment/international/status', component: InternationalPaymentStatusComponent },
  {
    path: '**',
    redirectTo: 'home'
  }
];
@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
