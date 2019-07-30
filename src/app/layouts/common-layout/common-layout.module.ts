import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {CompanyComponent} from '../../pages/company/company.component';
import { CommonLayoutRoutes } from './common-layout.routing';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { ProfileModule } from 'src/app/pages/profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule
  ],
  declarations: [
    RegistersuccessComponent,
    CompanyComponent,
  ],
})
export class CommonLayoutModule {}
