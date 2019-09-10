import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/authentication/components/login/login.component';
import { RegistrationComponent } from 'src/app/modules/authentication/components/registration/registration.component';
import { PasswordResetComponent } from 'src/app/modules/authentication/components/password-reset/password-reset.component';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import {
  EnterResetPasswordComponent
} from 'src/app/modules/authentication/components/enter-reset-password/enter-reset-password.component';


export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'LandVille | Make it yours Today' }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      title: 'Register | Create a free account today!',
      tags: [
        // Open Graph Data
        { property: 'og:title', content: 'Register | Create a free account today!' },
        {
          property: 'og:description',
          content: 'Create an access so you can can get access to a wide range of property investment options'
        },
        // Twitter
        { name: 'twitter:title', content: 'Register | Create a free account today!' },
        {
          name: 'twitter:description', content:
            'Create an account so you can can get access to a wide range of property investment options'
        },
      ]
    }
  },
  {
    path: 'reset-link', data: { title: 'Reset your Password', tags: [] },
    component: PasswordResetComponent, canActivate: [NoAuthGuard]
  },
  {
    path: 'auth/password-reset', data: {
      title: 'Choose a new password', tags: []
    },
    component: EnterResetPasswordComponent, canActivate: [NoAuthGuard]
  },
];
