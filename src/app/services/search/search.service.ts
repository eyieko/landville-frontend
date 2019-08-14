import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/app/models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Search({ value }) {
  //   value.title
  //   value.description
  //   value.street
  //   value.state
  //   value.company
  //   value.city
  //   value.type
  //   value.purchase_plan
  //   value.garages
  //   value.bathrooms
  //   value.bedrooms
  //   value.lot_size
  //   value.price_min
  //   value.price_max
  // }
  apiUrl = "http://localhost:4200/api/v1/properties/?"

  constructor(private http: HttpClient) { }

  searchProperties() {
    let searchUrl = this.apiUrl;
    return this.http.get(searchUrl)
  }
}
