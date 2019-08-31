import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PropertyDetailsComponent } from 'src/app/pages/property-details/property-details.component';
import { PropertyDetailComponent } from 'src/app/pages/property-details/property-detail/property-detail.component';
import { ClientAdminComponent } from 'src/app/pages/property-details/client-admin/client-admin.component'
import { PropertyDescriptionComponent } from 'src/app/pages/property-details/property-description/property-description.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
    declarations: [
        PropertyDetailsComponent,
        PropertyDetailComponent,
        ClientAdminComponent,
        PropertyDescriptionComponent,
        ReviewsComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [PropertyDetailsComponent]
})
export class PropertyDetailsModule { }
