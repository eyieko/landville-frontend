import { Component} from '@angular/core';
import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-to-wishlist',
  templateUrl: './add-to-wishlist.component.html',
  styleUrls: ['./add-to-wishlist.component.scss']
})
export class AddToWishlistComponent {


  constructor(
    private wishedPropertiesService: PropertiesWishlistService,
    private router: Router,
    private toastrService: ToastrService, ) {

  }

  addToWishlist(): void {
    this.wishedPropertiesService.addToWishlist('house-at-he-Peak-of-the-mountain').subscribe(
       response => {
         this.router.navigate(['/my-wishlist']);
         this.toastrService.success(response.data);
    }, error => {
      this.toastrService.error(error.errors);
    }

     );
  }
}
