import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  data;
  url = 'http://127.0.0.1:8000/api/v1/auth/password-reset/';
  // url = 'http://127.0.0.1:8000/api/v1/properties/';

  constructor(private http: HttpClient) { }

  getResetLink(_email) {
    this.data = {
      email: _email
    }
    return this.http.post(this.url, this.data);
  }
}
