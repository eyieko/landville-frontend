import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { FeaturesComponent } from './modules/features/features.component';
import { PasswordResetComponent } from './modules/authentication/components/password-reset/password-reset.component';
import { EnterResetPasswordComponent } from './modules/authentication/components/enter-reset-password/enter-reset-password.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import {
  InternationalPaymentStatusComponent
} from 'src/app/modules/features/components/payment/international-payment-status/international-payment-status.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { NoPropertiesComponent } from './components/properties/no-properties/no-properties.component';
import { TermsPageComponent } from './components/terms/terms.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { RegistersuccessComponent } from './modules/authentication/components/registration/registersuccess/registersuccess.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
      }
    ],
    canActivate: [NoAuthGuard]
  },
  {
    path: 'terms-and-conditions',
    component: TermsPageComponent,
    data: {
      title: 'LandVille Terms and Conditions of Use',
      tags: [],
    },
  },
  {
    path: 'registersuccess',
    component: RegistersuccessComponent,
    data: {
      title: 'Registration successful',
      tags: [],
    },
  },
  {
    path: '',
    component: FeaturesComponent,
    children: [{
      path: '',
      loadChildren: './modules/features/features.module#FeaturesModule',
    }],
    // canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'LandVille helps you access real estate and property investing in Nigeria.' +
        ' Make the best and safest decision. ' +
        'Let tech help you find your dream Property today',
      tags: [
        // Open Graph Data
        {
          property: 'og:title',
          content: 'LandVille | Find your dream property today',
        },
        {
          property: 'og:description',
          content: 'Make that property yours today',
        },
        {
          name: 'og:image',
          content: 'assets/img/ICON/Logo.png'
        },
        // Twitter
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:image',
          content: 'assets/img/ICON/Logo.png',
        },
        {
          name: 'twitter:title',
          content: 'LandVille | Find your dream Property today',
        },
        {
          name: 'twitter:description',
          content: 'Make that property yours today',
        },
      ]
    }
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
  { path: 'no-properties', component: NoPropertiesComponent },
  {
    path: '**',
    redirectTo: 'home'
  }
];
@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule { }
