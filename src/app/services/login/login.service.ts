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

  static logout() {
    // removes user from local storage to log user out
    localStorage.clear();
    location.reload(true);
  }

  login(loginData: any): Observable<any> {
    return this.http.makeRequestWithData(this.loginUrl, loginData, HttpMethods.POST);
  }
}
