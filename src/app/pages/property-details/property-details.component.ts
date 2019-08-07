import { Component, OnInit } from '@angular/core';
import { PropertyDetail } from '../../models/property-detail/Property-detail'
import { PropertyDetailService } from '../../services/property-detail/property-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})

export class PropertyDetailsComponent implements OnInit {
  property: Array<any> = [];
  slug: string;
  rooms: number;
  bathrooms: number;
  garages: number;
  city: string;
  state: string;
  street: string;
  title: string;
  price: string;
  description: string;
  image_main: string;
  image_others: Array<any> = [];
  lot_size: string;
  video: string;
  ifBuilding: boolean;

  constructor(
    private route: ActivatedRoute,
    private propertyservice: PropertyDetailService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      let slug = result.get('slug');
      this.viewProperty(slug);
    })
  }

  viewProperty(slug) {
    this.propertyservice.getProperty(slug).subscribe(
      response => {
        const priceHolder = response.data.property.price;
        this.description = response.data.property.description;
        this.title = response.data.property.title;
        this.city = response.data.property.address.City;
        this.state = response.data.property.address.State;
        this.street = response.data.property.address.Street;
        this.price = priceHolder.toString();
        this.image_main = response.data.property.image_main;
        this.image_others = response.data.property.image_others;
        this.lot_size = response.data.property.lot_size;
        this.video = response.data.property.video
        this.property = response.data.property;
        this.checkIfBuilding(response.data.property.property_type, response.data.property );
        
      }
    )
  }
  checkIfBuilding(property, data) {
    if (property === "Building") {
      this.ifBuilding = true;
      this.rooms = data.bedrooms;
      this.bathrooms = data.bathrooms;
      this.garages = data.garages;
    }
  }
}


