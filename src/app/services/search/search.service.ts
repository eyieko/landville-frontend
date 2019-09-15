import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpService) { }

  searchProperties(search: string): Observable<any> {
    const searchUrl = `/properties/?${search}`;
    return this.http.getRequestWithParams(searchUrl);
  }
}
