import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonLayoutRoutes } from './common-layout.routing';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileModule } from 'src/app/pages/profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
    ProfileModule,
    HttpClientModule
  ],
  declarations: [HomeComponent, RegistersuccessComponent]
})
export class CommonLayoutModule {}
