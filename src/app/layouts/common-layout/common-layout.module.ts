import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonLayoutRoutes } from 'src/app/layouts/common-layout/common-layout.routing';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileModule } from 'src/app/pages/profile/profile.module';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
import { RegistersuccessComponent } from 'src/app/pages/registration/registersuccess/registersuccess.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { PropertiesComponent } from 'src/app/pages/properties/properties.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { PaymentModule } from 'src/app/pages/payment/payment.module';

import { PropertyDetailsComponent } from 'src/app/pages/property-details/property-details.component'
import { PropertyDetailsModule } from "src/app/pages/property-details/property-details.module"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule.forChild(CommonLayoutRoutes),
    ComponentsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
		PaymentModule,
    PropertyDetailsModule
  ],
  declarations: [
    HomeComponent,
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    CardComponent,

  ],
  providers: [ProfileService, LocalStorageService, Title],
})
export class CommonLayoutModule {
}
