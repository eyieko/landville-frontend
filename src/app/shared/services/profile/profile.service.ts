import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UserProfile,
  UserProfileResponse,
  UserProfileUpdatedResponse
} from 'src/app/models/Profile';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileUrl = 'http://127.0.0.1:8000/api/v1/auth/profile/';
  profile: Observable<UserProfile>;
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
      this.profileUrl,
      this.httpOptions
    );
  }
  updateProfile(profileData: any): Observable<UserProfileUpdatedResponse> {
    return this.http.patch<UserProfileUpdatedResponse>(
      this.profileUrl,
      profileData,
      this.httpOptions
    );
  }
}
