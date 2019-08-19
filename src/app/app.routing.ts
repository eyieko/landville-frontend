import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './pages/enter-reset-password/enter-reset-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';


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
    canActivate: [NoAuthGuard]
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
    path: 'reset-link',
    component: PasswordResetComponent
  },
  {
    path: 'auth/password-reset',
    component: EnterResetPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
