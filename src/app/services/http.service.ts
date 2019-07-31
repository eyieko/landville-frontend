import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APPCONFIG } from 'src/app/config';



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
