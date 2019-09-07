import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) {
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${ environment.apiUrl }/auth/client/`, company);
  }

  getCompanyDetails() {
    return this.http.get<Company>(`${ environment.apiUrl }/auth/client/`);
  }
}
