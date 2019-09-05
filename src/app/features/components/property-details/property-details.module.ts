import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PropertyDetailsComponent } from 'src/app/features/components/property-details/property-details.component';
import { PropertyDetailComponent } from 'src/app/features/components/property-details/property-detail/property-detail.component';
import { ClientAdminComponent } from 'src/app/features/components/property-details/client-admin/client-admin.component'
import { PropertyDescriptionComponent } from 'src/app/features/components/property-details/property-description/property-description.component';

@NgModule({
    declarations: [
        // PropertyDetailsComponent,
        // PropertyDetailComponent,
        // ClientAdminComponent,
        // PropertyDescriptionComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        NgxSpinnerModule,
    ],
    providers: [],
    bootstrap: [PropertyDetailsComponent]
})
export class PropertyDetailsModule { }
