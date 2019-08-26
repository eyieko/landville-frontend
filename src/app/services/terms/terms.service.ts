import { Term } from './../../models/Term';
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

  getTerms(): Observable<Term> {
    return this.http.get<Term>(environment.api_url + '/terms/');
  }
}
