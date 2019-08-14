import { CardComponent } from './../../components/card/card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { CompanyComponent } from '../../pages/company/company.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';
import { CommonLayoutRoutes } from './common-layout.routing';
import { ProfileModule } from 'src/app/pages/profile/profile.module';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommonLayoutRoutes)
  ],
  declarations: [
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    CardComponent
  ],
  providers: [LocalStorageService]
})
export class CommonLayoutModule {}
