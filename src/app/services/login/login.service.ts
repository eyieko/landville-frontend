import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = { 
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
  }) 
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl: string = 'http://127.0.0.1:8000/api/v1/auth/login/'

  constructor(private http: HttpClient) { }

  login (loginData: any):Observable<any>{
     return this.http.post(this.loginUrl, loginData, httpOptions)
  };
}
