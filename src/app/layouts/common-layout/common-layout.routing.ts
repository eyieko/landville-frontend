import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const CommonLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent }
];
