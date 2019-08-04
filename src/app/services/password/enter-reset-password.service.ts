import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethods } from 'src/app/config';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class EnterResetPasswordService {
  data;
  url = '/auth/password-reset/?token=';

  constructor(private http: HttpService) { }

  changePassword(token, newPassword): Observable<any> {
    this.data = {
      password: newPassword,
      confirm_password: newPassword
    };

    return this.http.makeRequestWithData(this.url + token, this.data, HttpMethods.PATCH);
  }
}
