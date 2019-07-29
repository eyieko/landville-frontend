import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APPCONFIG } from '../config';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  base_url = APPCONFIG.base_url

  httpOptions = { 
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    }) 
  }

  constructor(private http: HttpClient) { }
  
  // get request without any params
  // commented out for testing purposes
  // getRequest(endpoint, baseUrl = this.base_url) {
  //   return this.http.get(baseUrl + endpoint);
  // }

  // // use this when making get requests with params
  // getRequestWithParams(endpoint, params = {}) {
  //   return this.http.get(this.base_url + endpoint, { params });
  // }
  
  // use this for POST,PUT or PATCH.
  makeRequestWithData<T>(
    endpoint: any,
    data: any,
    method: any,
    baseUrl = this.base_url,
    params: any = this.httpOptions,
  ): Observable<T> | any {
    return this.http[method](`${baseUrl}${endpoint}`, data, params);
  }

}
