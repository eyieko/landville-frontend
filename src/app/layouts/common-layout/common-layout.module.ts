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
import {CompanyComponent} from 'src/app/pages/company/company.component';
import {CommonLayoutRoutes} from 'src/app/layouts/common-layout/common-layout.routing';
import {ProfileModule} from 'src/app/pages/profile/profile.module';
import {RegistersuccessComponent} from 'src/app/pages/registration/registersuccess/registersuccess.component';
import {HomeComponent} from 'src/app/pages/home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonLayoutRoutes } from 'src/app/layouts/common-layout/common-layout.routing';

import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileModule } from 'src/app/pages/profile/profile.module';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommonLayoutRoutes)
    HttpClientModule,
    ComponentsModule,
  ],
  declarations: [
    HomeComponent,
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    CardComponent
  ],
  providers: [ProfileService, LocalStorageService],
})
export class CommonLayoutModule {}
