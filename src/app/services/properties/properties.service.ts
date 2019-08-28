import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertiesResponse } from 'src/app/models/Property';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor(private http: HttpClient) {
  }

  getProperties(propertiesUrl: string): Observable<any> {
    return this.http.get<PropertiesResponse>(propertiesUrl);
  }

  getPropertyBySlug(slug): Observable<any> {
    return this.http.get<any>(`${ environment.apiUrl }/properties/${ slug }`);
  }

  getTrendingProperty(param?: string): Observable<any> {
    return this.http.get<any>(`${ environment.apiUrl }/properties/trending?city=${ param }`);
  }
}
