import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { RegistrationComponent } from '../../pages/registration/registration.component';


export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'LandVille | Make it yours Today' } },
  { path: 'register', component: RegistrationComponent },
];
