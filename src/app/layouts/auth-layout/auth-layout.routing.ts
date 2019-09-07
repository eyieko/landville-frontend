import { Routes } from '@angular/router';
import { EnterResetPasswordComponent } from 'src/app/components/enter-reset-password/enter-reset-password.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PasswordResetComponent } from 'src/app/components/password-reset/password-reset.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';


export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'LandVille | Make it yours Today' } },
  {
    path: 'register', component: RegistrationComponent, data: {
      title: 'Register | Create a free account today!', tags:
        [
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
  { path: 'reset-link', component: PasswordResetComponent },
  { path: 'auth/password-reset', component: EnterResetPasswordComponent },
];
