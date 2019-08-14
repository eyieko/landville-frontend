import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results: any[] = [];
  searchForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    street: new FormControl(),
    state: new FormControl(),
    company: new FormControl(),
    city: new FormControl(),
    type: new FormControl(),
    purchase_plan: new FormControl(),
    garages: new FormControl(),
    bathrooms: new FormControl(),
    bedrooms: new FormControl(),
    lot_size: new FormControl(),
    price_min: new FormControl(),
    price_max: new FormControl(),
  })
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchForm.valueChanges
      .subscribe(searchForm => this.searchService.searchProperties()
        .subscribe(result => console.log(result)));
  }

}
