import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = '/auth/login/';
  resetUrl = '/auth/password-reset/';
  changePasswordUrl = '/auth/password-reset/?token=';
  registerUrl = '/auth/register/';
  googleUrl = '/auth/google/';
  facebookUrl = '/auth/facebook/';

  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  logoutUser() {
    return this.http.post('/auth/logout/', null);

  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    let decodedToken = null;
    try {
      decodedToken = this.helper.decodeToken(token);
    } catch (error) {
      return false;
    }
    return decodedToken && !this.helper.isTokenExpired(token);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.loginUrl }`, loginData);
  }

  registerUser(register: any): Observable<any> {
    return this.http.post<any>(`${ environment.apiUrl }${ this.registerUrl }`, register);
  }

  getResetLink(resetEmail): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.resetUrl }`, {
      email: resetEmail
    });
  }

  changePassword(token, newPassword): Observable<any> {
    const data = {
      password: newPassword,
      confirm_password: newPassword
    };
    return this.http.patch(`${ environment.apiUrl }${ this.changePasswordUrl }${ token }`, data);
  }

  createGoogleUser(accessToken: any): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.googleUrl }`, accessToken);
  }

  createFacebookUser(accessToken: any): Observable<any> {
    return this.http.post(`${ environment.apiUrl }${ this.facebookUrl }`, accessToken);
  }
}