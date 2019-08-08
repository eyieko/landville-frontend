import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { HttpMethods } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  emailData;
  url = '/auth/password-reset/';


  constructor(private http: HttpService) { }

  getResetLink(resetEmail): Observable<any> {
    this.emailData = {
      email: resetEmail
    };
    return this.http.makeRequestWithData(this.url, this.emailData, HttpMethods.POST);
  }
}
