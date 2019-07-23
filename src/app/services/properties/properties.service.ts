import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Property, PropertiesResponse } from "src/app/models/Property";

@Injectable({
  providedIn: "root"
})
export class PropertiesService {
  userToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJidXllckBnbWFpbC5jb20iLCJleHAiOjE1NjM5NzMzMDN9.NteIiDP9iVbs69kVBdHPA5EK-NBlqKWy_ZcRfdRLUOk";

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
