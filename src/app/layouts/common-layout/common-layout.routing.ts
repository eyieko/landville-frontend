import { Routes } from '@angular/router';
import { Error401Component } from 'src/app/pages/custom-error/error401/error401.component';
import { Error403Component } from 'src/app/pages/custom-error/error403/error403.component';
import { Error404Component } from 'src/app/pages/custom-error/error404/error404.component';
import { Error500Component } from 'src/app/pages/custom-error/error500/error500.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { AuthGuard } from '../../helpers/auth.guard';
import { CompanyComponent } from '../../pages/company/company.component';
import { HomeComponent } from '../../pages/home/home.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'create-company',
    component: CompanyComponent,
    canActivate: [ AuthGuard ]
  },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'no-properties', component: NoPropertiesComponent },
  { path: 'error404', component: Error404Component },
  { path: 'error500', component: Error500Component },
  { path: 'error403', component: Error403Component },
  { path: 'error401', component: Error401Component },
];
