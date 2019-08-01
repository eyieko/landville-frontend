import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';


export const CommonLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
]
