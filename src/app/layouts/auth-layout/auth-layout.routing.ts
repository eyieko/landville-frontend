import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { RegistrationComponent } from '../../pages/registration/registration.component';


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
  }
];
