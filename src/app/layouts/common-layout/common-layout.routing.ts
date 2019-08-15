import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';

export const CommonLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'create-company',
    component: CompanyComponent,
    canActivate: [ AuthGuard ]
  },
  { path: 'properties', component: PropertiesComponent },
  { path: 'no-properties', component: NoPropertiesComponent },
  { path: 'create-company', component: CompanyComponent, canActivate: [ AuthGuard ] },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
];
