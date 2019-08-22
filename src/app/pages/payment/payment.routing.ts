import { TokenizedCardComponent } from './tokenized-card.component';
import {Routes} from '@angular/router';

export const paymentRoutes: Routes = [
  {path: 'payment/saved-card', component: TokenizedCardComponent},
];
