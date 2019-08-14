import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EnterResetPasswordComponent } from 'src/app/pages/enter-reset-password/enter-reset-password.component';
import { PasswordResetComponent } from 'src/app/pages/password-reset/password-reset.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';


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
    ]
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
    redirectTo: 'error404',
  }
];

@NgModule({
  imports: [ CommonModule, BrowserModule, RouterModule.forRoot(routes) ],
  exports: []
})
export class AppRoutingModule {
}
