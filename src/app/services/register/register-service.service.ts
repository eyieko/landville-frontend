import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registerdetails } from '../../models/register/register-details';
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
  registerUrl = 'http://127.0.0.1:8000/api/v1/auth';
  constructor(private http: HttpClient) {
   }
   registerUser(register: Registerdetails): Observable<Registerdetails> {
    return this.http.post<Registerdetails>(`${this.registerUrl}/register/`, register);
   }

}
