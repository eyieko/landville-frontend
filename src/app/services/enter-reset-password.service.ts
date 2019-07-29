import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterResetPasswordService {
  data;
  url = 'http://127.0.0.1:8000/api/v1/auth/password-reset/?token=';

  constructor(private http: HttpClient) { }

  changePassword(token, newPassword) : Observable<any> {
    this.data = {
      password: newPassword,
      confirm_password: newPassword
    }
    
    return this.http.patch(this.url+token, this.data)
                  .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
