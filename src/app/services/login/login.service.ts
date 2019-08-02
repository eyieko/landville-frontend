import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../http.service';
import {HttpMethods} from '../../config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = '/auth/login/';

  constructor(private http: HttpService) {
  }

  static logout() {
    // removes user from local storage to log user out
    localStorage.removeItem('token');
    location.reload(true);
  }

  login(loginData: any): Observable<any> {
    return this.http.makeRequestWithData(this.loginUrl, loginData, HttpMethods.POST);
  }
}
