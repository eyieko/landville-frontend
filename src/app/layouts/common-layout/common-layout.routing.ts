import { Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { TermsPageComponent } from 'src/app/pages/terms/terms.component';
import { PropertyDetailsComponent } from 'src/app/pages/property-details/property-details.component';
import { DepositsComponent } from 'src/app/pages/deposits/deposits.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, data: {
      title: 'Find your dream Property today', tags:
        [
          // Open Graph Data
          { property: 'og:title', content: 'LandVille | Find your dream Property today' },
          {
            property: 'og:description',
            content: 'Make that property yours today'
          },
          // Twitter

          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:image', content: '../../../assets/img/ICON/Logo.png' },
          { name: 'twitter:title', content: 'LandVille | Find your dream Property today' },
          {
            name: 'twitter:description', content:
              'Make that property yours today'
          },


        ]
    }
  },
  {
    path: 'create-company',
    component: CompanyComponent, data: {
      title: 'Create Partner Company'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'properties', component: PropertiesComponent, data: {
      title: 'All Properties | Acquire your dream property with ease today', tags: [
        // Open Graph Data
        { property: 'og:title', content: 'All Properties | Acquire your dream property with ease today' },
        {
          property: 'og:description',
          content: 'Browse a wide range of the best property across Nigeria'
        },
        // Twitter
        { name: 'twitter:title', content: 'All Properties | Acquire your dream property with ease today' },
        { name: 'twitter:description', content: 'Browse a wide range of the best property across Nigeria' },
      ]
    },
  },
  { path: 'no-properties', component: NoPropertiesComponent },
  { path: 'registersuccess', component: RegistersuccessComponent, data: { title: 'Regitration successfull', tags:[] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'User Profile' } },
  { path: 'terms-and-conditions', component: TermsPageComponent, data: { title: 'LandVille Terms and Conditions of Use', tags: [] } },
  { path: 'properties/:slug', component: PropertyDetailsComponent }

];
