import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/register/user';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../http.service';
import { HttpMethods } from '../../config';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  registerUrl = environment.authUrl;
  constructor(private http: HttpService) {
   }
   registerUser(register: User): Observable<User> {
    return this.http.makeRequestWithData(this.registerUrl, register, HttpMethods.POST);
}
}
