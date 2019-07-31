import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertiesResponse, Property } from 'src/app/models/Property';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(propertiesUrl: string): Observable<any> {
    return this.http.get<PropertiesResponse>(propertiesUrl);
  }
}
