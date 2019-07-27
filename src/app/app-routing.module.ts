import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './components/enter-reset-password/enter-reset-password.component';

const routes: Routes = [
  { path: 'auth/reset-link', component: PasswordResetComponent },
  { path: 'auth/password-reset', component: EnterResetPasswordComponent },
];

@NgModule({
  imports: [FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
