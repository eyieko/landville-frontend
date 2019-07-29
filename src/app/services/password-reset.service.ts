import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  emailData;
  url = 'http://127.0.0.1:8000/api/v1/auth/password-reset/';


  constructor(private http: HttpClient) { }

  getResetLink(resetEmail): Observable<any> {
    this.emailData = {
      email: resetEmail
    };
    return this.http.post(this.url, this.emailData);
  }
}
