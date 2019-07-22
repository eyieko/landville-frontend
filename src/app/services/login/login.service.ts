import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { HttpMethods } from '../../config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string = 'auth/login/'

  constructor(private http: HttpService) { }

  login (loginData: any):Observable<any>{
    return this.http.makeRequestWithData(this.loginUrl, loginData, HttpMethods.POST)
  };
}
