import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertiesResponse } from 'src/app/models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(propertiesUrl: string): Observable<any> {
    return this.http.get<PropertiesResponse>(propertiesUrl);
  }
}
