import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  UserProfile,
  UserProfileResponse,
  UserProfileUpdatedResponse
} from 'src/app/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileUrl: string = 'http://127.0.0.1:8000/api/v1/auth/profile/';
  profile: Observable<UserProfile>;
  userToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsImVtYWlsIjoia2VpdGgubWFuZGVsYUBhbmRlbGEuY29tIiwiZXhwIjoxNTYzNDcyMTM5fQ.c0u-E6OhYlg5wkoO6TKRSznuPu0jrQwe_QbBPXaF1Lw';
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

  constructor(private http: HttpClient) {}
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
