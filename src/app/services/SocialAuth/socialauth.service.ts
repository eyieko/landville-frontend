import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { APPCONFIG } from 'src/app/config';

const baseUrl = APPCONFIG.base_url;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  googleUrl = APPCONFIG.base_url + '/auth/google/';
  facebook_url = APPCONFIG.base_url + '/auth/facebook/';


  constructor(private http: HttpClient) {}

  createGoogleUser(accessToken: any): Observable<any> {
    return this.http.post(this.googleUrl, accessToken, httpOptions);
  }
  createFacebookUser(accessToken: any): Observable<any> {
    return this.http.post(this.facebook_url, accessToken, httpOptions);
  }
}
