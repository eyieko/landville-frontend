import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Term } from './../../models/Term';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private http: HttpClient) {

  }

  getTerms(): Observable<Term> {
    return this.http.get<Term>(`${ environment.apiUrl }/terms/`);
  }
}
