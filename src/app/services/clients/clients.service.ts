import { Injectable } from '@angular/core';
import { ClientCompany } from 'src/app/models/Client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  fetchClientCompanies(): Observable<ClientCompany> {
    return this.http.get<ClientCompany>(
      `${environment.api_url}/auth/clients/`
    );
  }
}
