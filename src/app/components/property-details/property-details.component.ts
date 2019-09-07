import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PropertyDetail } from 'src/app/models/property-detail/Property-detail';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: [ './property-details.component.scss' ]
})

export class PropertyDetailsComponent implements OnInit, OnDestroy {
  property: PropertyDetail;
  slug: string;
  bedrooms: number;
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
  purchasePlan: string;
  subscribe: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertiesService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      const slug = result.get('slug');
      this.viewProperty(slug);
    });
  }

  viewProperty(slug) {
    this.spinner.show();
    this.subscribe.add(
      this.propertyService.getPropertyBySlug(slug).subscribe(
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
          this.video = response.data.property.video;
          this.property = response.data.property;
          this.checkIfBuilding(response.data.property.property_type, response.data.property);
          this.checkIfVideo(this.video);
          this.clientName = response.data.property.client.client_name;
          this.createdAt = response.data.property.created_at;
          this.phone = response.data.property.client.phone;
          this.email = response.data.property.client.email;
          this.clientStreet = response.data.property.client.address.Street;
          this.clientCity = response.data.property.client.address.City;
          this.clientState = response.data.property.client.address.State;
          this.purchasePlan = response.data.property.purchase_plan;
          this.spinner.hide();
        }, error => {
          this.toastrService.error(JSON.stringify(error.errors));
          this.router.navigate([ '/properties' ]);
          this.spinner.hide();

        }
      )
    );
  }

  checkIfBuilding(property, data) {
    if (property === 'Building') {
      this.ifBuilding = true;
      this.bedrooms = data.bedrooms;
      this.bathrooms = data.bathrooms;
      this.garages = data.garages;
    }
  }

  checkIfVideo(video: string) {
    if (video) {
      this.ifVideo = true;
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
