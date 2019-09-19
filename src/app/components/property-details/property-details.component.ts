import { ProfileService } from 'src/app/services/profile/profile.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyDetail } from 'src/app/models/property-detail/Property-detail';
import { Subscription } from 'rxjs';
import { removeSubscription } from 'src/app/helpers/unsubscribe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
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
  clientId: number;
  deletePropertyMsg: string;
  subscribe: Subscription[] = [];
  displayedModal = false;
  isMine = false;
  loggedin_user: number;
  admin_email: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyservice: PropertyDetailService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      this.slug = result.get('slug');
      this.viewProperty(this.slug);
      this.getClient(this.slug);
    });
  }

  viewProperty(slug) {
    this.spinner.show();
    this.subscribe.push(
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
          this.video = response.data.property.video;
          this.property = response.data.property;
          this.checkIfBuilding(
            response.data.property.property_type,
            response.data.property
          );
          this.checkIfVideo(this.video);
          this.clientName = response.data.property.client.client_name;
          this.createdAt = response.data.property.created_at;
          this.phone = response.data.property.client.phone;
          this.email = response.data.property.client.email;
          this.clientStreet = response.data.property.client.address.Street;
          this.clientCity = response.data.property.client.address.City;
          this.clientState = response.data.property.client.address.State;
          this.purchasePlan = response.data.property.purchase_plan;
          this.clientId = response.data.property.client.id;
          this.spinner.hide();
        },
        error => {
          this.toastrService.error(JSON.stringify(error.errors));
          this.router.navigate(['/properties']);
          this.spinner.hide();
        }
      )
    );
  }

  getClient(slug) {
    this.profileService.getProfile().subscribe(response => {
      this.loggedin_user = response.data.profile.user.id;
    });
    this.propertyservice.getProperty(slug).subscribe(response => {
      this.admin_email = response.data.property.client.admin_id;
    });
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
  displayModal() {
    this.displayedModal = this.propertyservice.displayModalService();
    this.deletePropertyMsg = 'Are you sure you want to delete this property?';
  }
  closeModal($event) {
    this.displayedModal = $event;
  }

  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
