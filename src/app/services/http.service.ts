import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APPCONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base_url = APPCONFIG.base_url;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //      'Content-Type': 'application/json'
  //   })
  // };

  constructor(private http: HttpClient) {}

  // // use this when making get requests with params
  getRequestWithParams = (endpoint, params = {}) => {
    return this.http.get(this.base_url + endpoint, { params });
  }
  deleteRequestWithParams(endpoint, params = {}) {
    return this.http.delete(this.base_url + endpoint, { params });
  }

  // use this for POST,PUT or PATCH.
  makeRequestWithData = (
    endpoint: any,
    data: any,
    method: any,
    params?: any
  ) => {
    return this.http[method](`${this.base_url}${endpoint}`, data, params);
  }
}
