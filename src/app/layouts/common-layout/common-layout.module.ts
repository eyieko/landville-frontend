import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomErrorModule } from 'src/app/pages/custom-error/custom-error.module';
import { ProfileModule } from 'src/app/pages/profile/profile.module';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { CompanyComponent } from '../../pages/company/company.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { CardComponent } from './../../components/card/card.component';
import { CommonLayoutRoutes } from './common-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommonLayoutRoutes),
    CustomErrorModule,
  ],
  declarations: [
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    CardComponent,
  ],
  providers: [
    LocalStorageService,
  ]
})
export class CommonLayoutModule {
}
