import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethods } from '../../config';
import { User } from '../../models/register/user';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  registerUrl = '/auth/register/';

  constructor(private http: HttpService) {
  }

  registerUser(register: User): Observable<User> {
    return this.http.makeRequestWithData(this.registerUrl, register, HttpMethods.POST);
  }
}
