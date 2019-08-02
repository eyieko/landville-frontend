import { Component, OnInit } from '@angular/core';
import { PropertyDetail } from '../../models/property-detail/Property-detail'
import { PropertyDetailService } from '../../services/property-detail/property-detail.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'property-detail',
    templateUrl:'./property-detail.component.html',
    styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit{
    property: PropertyDetail;
    slug: string
     
    constructor(
        private route: ActivatedRoute,
        private propertyservice: PropertyDetailService
    ) { }

    ngOnInit(): void { 
        let slug = this.route.snapshot.paramMap.get('slug')
        this.viewProperty(slug)
        console.log(slug) 
        
    }

    viewProperty(slug) {
        this.propertyservice.getProperty(slug).subscribe(
            response => {

                console.log(response)
                this.property = response.data.property
            }
        )
    }
}