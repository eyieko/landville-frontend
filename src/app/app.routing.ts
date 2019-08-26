import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './pages/enter-reset-password/enter-reset-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { InternationalPaymentStatusComponent } from
'src/app/pages/payment/international-payment-status/international-payment-status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ],
    canActivate: []
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/common-layout/common-layout.module#CommonLayoutModule'
      }
    ]
  },
  {
    path: 'reset-link', data: { title: 'Reset your Password', tags: [] },
    component: PasswordResetComponent
  },
  {
    path: 'auth/password-reset', data: {
      title: 'Choose a new password', tags: []
    },
    component: EnterResetPasswordComponent
  },
  { path: 'payment/international/status', component: InternationalPaymentStatusComponent},
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
