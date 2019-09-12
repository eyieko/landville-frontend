import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  UserProfileResponse,
  UserProfileUpdatedResponse
} from 'src/app/models/Profile';
import { LocalStorageService } from '../local-storage.service';
import { APPCONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileUrl = '/auth/profile/';
  depositeUrl = '/transactions/';
  clientUrl = '/auth/client';
  userProfile$: Subject<any> = new Subject<any>();
  getDep$: Subject<any> = new Subject<any>();
  userToken = this.localStorageService.get('token', '');

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`
    })
  };
  httpFormHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userToken}`,
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(
      `${APPCONFIG.base_url}${this.profileUrl}`,
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
      `${APPCONFIG.base_url}${this.profileUrl}`,
      profileData,
      this.httpOptions
    );
  }

  getDeposits(): Observable<any> {
    return this.http.get<any>(
      `${APPCONFIG.base_url}${this.depositeUrl}`,
      this.httpOptions
    );
  }

  getClients(): Observable<any> {
    return this.http.get<any>(
      `${APPCONFIG.base_url}${this.clientUrl}`,
      this.httpOptions
    );
  }
}
