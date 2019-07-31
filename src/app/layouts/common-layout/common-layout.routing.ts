import {Routes} from '@angular/router';
import {CompanyComponent} from '../../pages/company/company.component';
import {AuthGuard} from '../../helpers/auth.guard';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { HomeComponent } from "../../pages/home/home.component";
import { PropertiesComponent } from "../../pages/properties/properties.component";


export const CommonLayoutRoutes: Routes = [
  {path: 'create-company', component: CompanyComponent, canActivate: [AuthGuard]},
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: "home", component: HomeComponent },
  { path: "registersuccess", component: RegistersuccessComponent },
  { path: "properties", component: PropertiesComponent }
];
