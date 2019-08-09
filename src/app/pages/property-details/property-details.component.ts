import { Component, OnInit } from '@angular/core';
import { PropertyDetailService } from '../../services/property-detail/property-detail.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
  imageMain: string;
  imageOthers: Array<any> = [];
  lotSize: string;
  video: string;
  ifBuilding: boolean;
  ifVideo: boolean;
  createdAt: string;
  clientName: string;
  phone: string;
  email: string;
  clientStreet: string;
  clientState: string;
  clientCity: string;

  constructor(
    private route: ActivatedRoute,
    private propertyservice: PropertyDetailService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      let slug = result.get('slug');
      this.viewProperty(slug);
    })
  }

  viewProperty(slug) {
    this.spinner.show();
    this.propertyservice.getProperty(slug).subscribe(
      response => {
        const priceHolder = response.data.property.price;
        this.description = response.data.property.description;
        this.title = response.data.property.title;
        this.city = response.data.property.address.City;
        this.state = response.data.property.address.State;
        this.street = response.data.property.address.Street;
        this.price = priceHolder.toString();
        this.imageMain = response.data.property.image_main;
        this.imageOthers = response.data.property.image_others;
        this.lotSize = response.data.property.lot_size;
        this.video = response.data.property.video
        this.property = response.data.property;
        this.checkIfBuilding(response.data.property.property_type, response.data.property);
        this.checkIfVideo(this.video)
        this.clientName = response.data.property.client.client_name;
        this.phone = response.data.property.client.phone
        this.email = response.data.property.client.email
        this.clientStreet = response.data.property.client.address.Street
        this.clientCity = response.data.property.client.address.City
        this.clientState = response.data.property.client.address.State
        this.spinner.hide();
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
  checkIfVideo(video: string) {
    if (video) {
      this.ifVideo = true;
    }
  }

}
