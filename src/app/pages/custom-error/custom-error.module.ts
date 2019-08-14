import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { Error401Component } from 'src/app/pages/custom-error/error401/error401.component';
import { Error403Component } from 'src/app/pages/custom-error/error403/error403.component';
import { Error404Component } from 'src/app/pages/custom-error/error404/error404.component';
import { Error500Component } from 'src/app/pages/custom-error/error500/error500.component';


@NgModule({
  declarations: [
    Error404Component,
    Error500Component,
    Error403Component,
    Error401Component,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    Error404Component,
    Error500Component,
    Error403Component,
    Error401Component,
  ],
})
export class CustomErrorModule {
}
