import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/register/register-details';
// import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  // registerUrl = environment.authUrl;
  registerUrl = 'http://127.0.0.1:8000/api/v1/';
  constructor(private http: HttpClient) {
   }
   registerUser(register: User): Observable<User> {
    return this.http.post<User>(`${this.registerUrl}auth/register/`, register);
   }

}
