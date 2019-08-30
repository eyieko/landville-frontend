import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  
  constructor(private http: HttpClient) {}

  addNewProperty(property: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/properties/`,
      property
    );
  }
}
