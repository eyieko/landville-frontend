import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CommonLayoutRoutes} from './common-layout.routing';
import {HomeComponent} from '../../pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class CommonLayoutModule {
}
