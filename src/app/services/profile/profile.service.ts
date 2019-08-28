import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserProfileResponse, UserProfileUpdatedResponse } from 'src/app/models/Profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileUrl = '/auth/profile/';
  depositeUrl = '/transactions/';
  userProfile$: Subject<any> = new Subject<any>();
  getDep$: Subject<any> = new Subject<any>();
  userToken = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${ this.userToken }`
    })
  };
  httpFormHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${ this.userToken }`,
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  getProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(
      `${ environment.apiUrl }${ this.profileUrl }`,
      this.httpOptions
    );
  }

  pushProfile() {
    this.getProfile().subscribe(
      response => {
        this.userProfile$.next(response);
      },
      error => {
        this.userProfile$.error(error);
      }
    );
  }

  updateProfile(profileData: any): Observable<UserProfileUpdatedResponse> {
    return this.http.patch<UserProfileUpdatedResponse>(
      `${ environment.apiUrl }${ this.profileUrl }`,
      profileData,
      this.httpOptions
    );
  }

  getDeposits(): Observable<any> {
    return this.http.get<any>(
      `${ environment.apiUrl }${ this.depositeUrl }`,
      this.httpOptions
    );
  }
}
