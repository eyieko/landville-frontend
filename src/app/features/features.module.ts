import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonLayoutRoutes } from 'src/app/features/features.routing';
import { CompanyComponent } from 'src/app/features/components/company/company.component';
import { HomeComponent } from 'src/app/features/components/home/home.component';
import { ProfileModule } from 'src/app/features/components/profile/profile.module';
import { NoPropertiesComponent } from 'src/app/features/components/properties/no-properties/no-properties.component';
import { RegistersuccessComponent } from 'src/app/authentication/components/registration/registersuccess/registersuccess.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { PropertiesComponent } from 'src/app/features/components/properties/properties.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { PaymentModule } from 'src/app/features/components/payment/payment.module';

import { PropertyDetailsModule } from 'src/app/features/components/property-details/property-details.module';
import { DepositsComponent } from 'src/app/features/components/deposits/deposits.component';
import { ClientsComponent } from 'src/app/features/components/clients/clients.component';
import {PropertyDetailsComponent} from "./components/property-details/property-details.component";
import {PropertyDetailComponent} from "./components/property-details/property-detail/property-detail.component";
import {ClientAdminComponent} from "./components/property-details/client-admin/client-admin.component";
import {PropertyDescriptionComponent} from "./components/property-details/property-description/property-description.component";

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
    PaymentModule
  ],
  declarations: [
    HomeComponent,
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent,
    NoPropertiesComponent,
    CardComponent,
    DepositsComponent,
    ClientsComponent,
    PropertyDetailsComponent,
    PropertyDetailComponent,
    ClientAdminComponent,
    PropertyDescriptionComponent,
  ],
  providers: [ProfileService, LocalStorageService, Title]
})
export class FeaturesModule {}
