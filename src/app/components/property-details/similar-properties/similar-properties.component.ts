import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

import {PropertyDetail} from 'src/app/models/property-detail/Property-detail';
import {SearchService} from 'src/app/services/search/search.service';

@Component({
  selector: 'app-similar-properties',
  templateUrl: './similar-properties.component.html',
  styleUrls: ['./similar-properties.component.scss']
})
export class SimilarPropertiesComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private search: SearchService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
  ) {}

  similarProperties: PropertyDetail[] = [];
  subscription: Subscription;

  @Input() propertyDetails: {
    title: string,
    state: string,
    price: string,
    bedrooms: number,
    bathrooms: number
  };

  filterOptions: any = [
    {text: 'In the same location', value: 'state'},
    {text: 'In a similar price range', value: 'price'},
    {text: 'With the same number of bedrooms', value: 'bedrooms'},
    {text: 'With the same number of bathrooms', value: 'bathrooms'},
  ];

  selectedOption = 'state';

  similarPropertiesForm = new FormGroup({
    filter: new FormControl()
  });

  carouselOptions = {
    margin: 25,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 2,
        nav: true,
        loop: false
      },
      1500: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  };

  calculatePriceRange(price): string {
    // price range = + or - 10% of the current price
    const currentPrice = Number(price);
    const lowerRange = currentPrice - (currentPrice * 0.1);
    const upperRange = currentPrice + (currentPrice * 0.1);
    return `price_min=${lowerRange}&price_max=${upperRange}`;
  }

  getSimilarProperties(option, value = this.propertyDetails) {
    this.spinner.show();
    let searchQuery = `${option}=${value[option]}`;
    if (option === 'price') {
      searchQuery = this.calculatePriceRange(`${value[option]}`);
    }
    this.subscription = this.search.searchProperties(searchQuery).subscribe(
      response => {
        this.similarProperties = response.data.properties.results.filter(  // filter out the current property
          ({title}) => title !== this.propertyDetails.title
        );
        this.spinner.hide();
      },
      _ => {
        this.toastrService.error('An error occurred when getting similar properties');
        this.spinner.hide();
      }
    );
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getSimilarProperties(this.selectedOption);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
