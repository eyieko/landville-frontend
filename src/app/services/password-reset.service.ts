import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  data;
  _ERROR;
  url = 'http://127.0.0.1:8000/api/v1/auth/password-reset/';


  constructor(private http: HttpClient) { }

  getResetLink(_EMAIL) {
    this.data = {
      email: _EMAIL
    };
    return this.http.post(this.url, this.data)
                    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    this._ERROR = error.error.errors.email[0];
    return throwError(this._ERROR);
  }
}
