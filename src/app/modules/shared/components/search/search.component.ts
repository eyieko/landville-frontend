import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/models/Search';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search$: Search[];
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchProperties()
      .subscribe(search => this.search$ = search);
  }

}
