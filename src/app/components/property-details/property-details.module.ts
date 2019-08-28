import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientAdminComponent } from 'src/app/components/property-details/client-admin/client-admin.component';
import { PropertyDescriptionComponent } from 'src/app/components/property-details/property-description/property-description.component';
import { PropertyDetailComponent } from 'src/app/components/property-details/property-detail/property-detail.component';

import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';

@NgModule({
  declarations: [
    PropertyDetailsComponent,
    PropertyDetailComponent,
    ClientAdminComponent,
    PropertyDescriptionComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [ PropertyDetailsComponent ]
})
export class PropertyDetailsModule {
}
