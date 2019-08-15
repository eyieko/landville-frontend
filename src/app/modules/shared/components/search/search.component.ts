import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { removeSubscription } from 'src/app/helpers/unsubscribe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  searchForm = new FormGroup({
    search: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    property_type: new FormControl(),
    bedrooms: new FormControl(),
    price_min: new FormControl(),
    price_max: new FormControl(),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() { }

  search({ value }) {
    this.spinner.show();
    let urlValues = Object.keys(value).reduce((acc, key) => value[key] ? acc + key + '=' + value[key] + '&' : acc, '');
    urlValues = urlValues.substring(0, urlValues.length - 1);
    this.router.navigate(['/properties'], { queryParams: { refresh: new Date().getTime(), q: urlValues } });
  }

  ngOnDestroy() {
    removeSubscription(this.subscription);
  }
}
