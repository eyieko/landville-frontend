import { Component, OnInit } from '@angular/core';
import { PropertiesWishlistResponse, Property } from 'src/app/models/Property';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { Router } from '@angular/router';
import { BuyPropertyService } from 'src/app/services/properties/properties-wishlist/buy-property/buy-property.service';


@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['../../profile/transaction-information/sass/transaction-information.component.scss']
})
export class MyWishlistComponent implements OnInit {
  public properties: [];
  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private propertiesWishlistService: PropertiesWishlistService,
    private buyPropertyService: BuyPropertyService,
    private router: Router, ) { }

  ngOnInit() {
    this.spinner.show();
    this.propertiesWishlistService.getMyWishlist().subscribe((response: PropertiesWishlistResponse []) => {
      this.properties = response['data'].property;
      this.spinner.hide();
      this.toastrService.success('Your wishlist properties has been retrieved successfully');
    }, error => {
        this.spinner.hide();
        this.toastrService.error(error.errors);
    });
  }

  removeFromWishlist(slug: string): void {
    this.spinner.show();
    this.propertiesWishlistService.removeFromWishList(slug).subscribe(
      response => {
        this.router.navigate(['/my-wishlist']);
        this.toastrService.success(response.data);
      }, error => {
        this.spinner.hide();
        this.toastrService.error(error.errors);
      }

    );
  }

  payProperty(property: Property, purpose: string): void {
    this.buyPropertyService.changeProperty(property, purpose);
    this.router.navigate(['payment/pin']);
  }

}
