import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientCompany } from 'src/app/models/Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {
  }

  fetchClientCompanies(): Observable<ClientCompany> {
    return this.http.get<ClientCompany>(
      `${ environment.apiUrl }/auth/clients/`
    );
  }
}
