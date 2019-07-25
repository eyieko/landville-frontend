import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PropertiesResponse, Property } from "src/app/models/Property";

@Injectable({
  providedIn: "root"
})
export class PropertiesService {
  userToken = "token";

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`
    })
  };

  constructor(private http: HttpClient) {}

  getProperties(propertiesUrl: string): Observable<any> {
    return this.http.get<PropertiesResponse>(propertiesUrl, this.httpOptions);
  }
}
