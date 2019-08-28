import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddProperty } from 'src/app/models/Property';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  addNewProperty(addProperty: AddProperty):Observable<AddProperty>{
    return this.http.post<AddProperty>(`${environment.api_url}/properties/`, addProperty);
  }
}
