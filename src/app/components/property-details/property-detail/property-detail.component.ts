import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  @Input() title: string;
  @Input() street: string;
  @Input() state: string;
  @Input() city: string;
  @Input() price: string;
  @Input() imageMain: string;
  @Input() imageOthers: any[] = [];
  @Input() bathrooms: string;
  @Input() garages: string;
  @Input() bedrooms: string;
  @Input() ifBuilding: boolean;
  @Input() slug: string;


  constructor(private wishedPropertiesService: PropertiesWishlistService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
  }

  addToWishlist(slug: string): void {
    this.wishedPropertiesService.addToWishlist(slug).subscribe(
      response => {
        this.router.navigate(['/my-wishlist']);
        this.toastrService.success(response.data);
      }, error => {
        this.toastrService.error(error.errors);
      }

    );
  }
}
