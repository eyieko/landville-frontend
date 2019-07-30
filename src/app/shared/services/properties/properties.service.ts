import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PropertiesResponse, Property } from "src/app/models/Property";
import { LocalStorageService } from "../local-storage.service";

@Injectable({
  providedIn: "root"
})
export class PropertiesService {
  userToken = this.localStorageService.get("token", "");

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`
    })
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getProperties(propertiesUrl: string): Observable<any> {
    return this.http.get<PropertiesResponse>(propertiesUrl, this.httpOptions);
  }
}
