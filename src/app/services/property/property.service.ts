import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AddProperty } from "src/app/models/Property";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  userToken = this.localStorageService.get('token', '');
  httpFormHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`,
      'Content-Type': 'multipart/form-data'
    })
  };
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  addNewProperty(property: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/properties/`,
      property,
      this.httpFormHeaders
    );
  }
}
