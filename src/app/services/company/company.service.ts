import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../models';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) {
  }

  createCompany(company: Company) {
    return this.http.post<Company>(`${environment.api_url}/auth/client/`, company).pipe(map(data => {
      // If created successfully
      if (data) {
        console.log('success:  ', data);
        // TODO: Redirect to home page
      }
      console.log('Failure: ', data);
      return data;
    }));
  }

  getCompanyDetails() {
    return this.http.get<Company>(`${environment.api_url}/auth/client/`);
  }
}
