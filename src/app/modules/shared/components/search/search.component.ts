import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/models/Search';
import { SearchService } from 'src/app/services/search/search.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search$: Search[];
  searchForm = new FormGroup({
    Keyword: new FormControl(),
    City: new FormControl(),
    State: new FormControl(),
    minimumPrice: new FormControl(),
    maximumPrice: new FormControl(),
    Bedrooms: new FormControl(),
  })
  constructor(private searchService: SearchService) { }

  Search({value}) {
  }

  ngOnInit() {
    this.searchService.searchProperties()
      .subscribe(search => this.search$ = search);
  }

}
