import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from 'src/app/models';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) {
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${environment.api_url}/auth/client/`, company);
  }

  getCompanyDetails() {
    return this.http.get<Company>(`${environment.api_url}/auth/client/`);
  }
  fetchClientCompanies(){
    return this.http.get<Company>(`localhost:8000/auth/clients/`);
  }
}
