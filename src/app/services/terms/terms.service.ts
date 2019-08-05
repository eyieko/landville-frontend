import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private http: HttpClient) {

  }

  getTerms(): Observable<any> {
    return this.http.get<any>(environment.api_url + '/terms/');
  }
}
