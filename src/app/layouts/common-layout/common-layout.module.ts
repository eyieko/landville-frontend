import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonLayoutRoutes } from './common-layout.routing';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
  ],
  declarations: [
    RegistersuccessComponent,
  ],
})
export class CommonLayoutModule {
}
