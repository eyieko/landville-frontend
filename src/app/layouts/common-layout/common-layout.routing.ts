import { Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PropertiesComponent } from 'src/app/pages/properties/properties.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { TermsPageComponent } from 'src/app/pages/terms/terms.component';
import { PropertyDetailsComponent } from 'src/app/pages/property-details/property-details.component';
import { DepositsComponent } from 'src/app/pages/deposits/deposits.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, data: {
      title: 'LandVille helps you access real estate and property investing in Nigeria.' +
        ' Make the best and safest decision. ' +
        'Let tech help you find your dream Property today', tags:
        [
          // Open Graph Data
          { property: 'og:title', content: 'LandVille | Find your dream property today' },
          {
            property: 'og:description',
            content: 'Make that property yours today'
          },
          { name: 'og:image', content: 'assets/img/ICON/Logo.png' },

          // Twitter
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:image', content: 'assets/img/ICON/Logo.png' },
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
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'LandVille' },
        { name: 'og:image', content: 'assets/img/ICON/Logo.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'assets/img/ICON/Logo.png' },
        { name: 'twitter:title', content: 'All Properties | Acquire your dream property with ease today' },
        { name: 'twitter:description', content: 'Browse a wide range of the best property across Nigeria' },
      ]
    },
  },
  { path: 'no-properties', component: NoPropertiesComponent },
  { path: 'registersuccess', component: RegistersuccessComponent, data: { title: 'Registration successful', tags: [] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'User Profile' } },
  { path: 'terms-and-conditions', component: TermsPageComponent, data: { title: 'LandVille Terms and Conditions of Use', tags: [] } },
  {
    path: 'properties/:slug', component: PropertyDetailsComponent, data: {
      title: 'All Properties | Acquire your dream property with ease today', tags: [
        // Open Graph Data
        { property: 'og:title', content: 'All Properties | Acquire your dream property with ease today' },
        {
          property: 'og:description',
          content: 'Browse a wide range of the best property across Nigeria'
        },
        // Twitter
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'LandVille' },
        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'assets/img/ICON/Logo.png' },
        { name: 'twitter:title', content: 'All Properties | Acquire your dream property with ease today' },
        { name: 'twitter:description', content: 'Browse a wide range of the best property across Nigeria' },
      ]
    },
  },
  {
    path: 'user/deposits',
    component: DepositsComponent,
    canActivate: [AuthGuard],
    data: { title: 'My Deposits', tags: [] }
  },
  {
    path: 'clients', component: ClientsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Client companies', tags: [] }
  }
];
