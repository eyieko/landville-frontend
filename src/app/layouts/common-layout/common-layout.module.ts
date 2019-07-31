import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";

import { CompanyComponent } from "../../pages/company/company.component";
import { PropertiesComponent } from "../../pages/properties/properties.component";
import { CommonLayoutRoutes } from "./common-layout.routing";
import { ProfileModule } from "src/app/pages/profile/profile.module";
import { RegistersuccessComponent } from "../../pages/registration/registersuccess/registersuccess.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [
    RegistersuccessComponent,
    CompanyComponent,
    PropertiesComponent
  ],
  providers: [LocalStorageService]
})
export class CommonLayoutModule {}
