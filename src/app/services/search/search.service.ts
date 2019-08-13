import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/app/models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl = "https://landville-backend-web-api.herokuapp.com/api/v1/properties/?" + "title"

  constructor(private _http: HttpClient) { }

  searchProperties() {
    return this._http.get<Search[]>(this.apiUrl)
  }
}
