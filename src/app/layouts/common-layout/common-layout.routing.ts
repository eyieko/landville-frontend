import {Routes} from '@angular/router';
import {HomeComponent} from '../../pages/home/home.component';
import {CompanyComponent} from '../../pages/company/company.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';


export const CommonLayoutRoutes: Routes = [
  {path: 'create-company', component: CompanyComponent},
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent }
];
