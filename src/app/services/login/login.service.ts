import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethods } from '../../config';
import { HttpService } from '../http.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = '/auth/login/';

  constructor(private http: HttpService) {
  }

  login(loginData: any): Observable<any> {
    return this.http.makeRequestWithData(this.loginUrl, loginData, HttpMethods.POST);
  }

  logoutUser() {
    return this.http.makeRequestWithData('/auth/logout/', null, HttpMethods.POST);

  }
}
