import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient) { }

  searchProperties(search: string) {
    const searchUrl = `${environment.api_url}/properties/?${search}`;
    return this.http.get(searchUrl);
  }
}
