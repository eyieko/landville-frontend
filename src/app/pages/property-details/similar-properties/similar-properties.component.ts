import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

import {PropertyDetail} from 'src/app/models/property-detail/Property-detail';
import {SearchService} from 'src/app/services/search/search.service';

@Component({
  selector: 'app-similar-properties',
  templateUrl: './similar-properties.component.html',
  styleUrls: ['./similar-properties.component.scss']
})
export class SimilarPropertiesComponent implements OnInit, OnChanges {

  constructor(private search: SearchService, private spinner: NgxSpinnerService) { }

  similarProperties: PropertyDetail[] = [];

  @Input() propertyDetails: {
    title: string,
    state: string,
    price: string,
    bedrooms: number,
    bathrooms: number
  };

  filterOptions: any = [
    {text: 'In the same location', value: 'state'},
    {text: 'With the same price', value: 'price'},
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

  getSimilarProperties(option, value = this.propertyDetails) {
    this.spinner.show();
    let searchQuery = `${option}=${value[option]}`;
    if (option === 'price') {
      // get price range: + or - 10% of the current price
      const currentPrice = Number(`${value[option]}`);
      const lowerRange = currentPrice - (currentPrice * 0.1);
      const upperRange = currentPrice + (currentPrice * 0.1);
      searchQuery = `price_min=${lowerRange}&price_max=${upperRange}`;
    }
    this.search.searchProperties(searchQuery).subscribe(
      response => {
        this.similarProperties = response.data.properties.results.filter(  // filter out the current property
          property => property.title !== this.propertyDetails.title
        );
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

}
