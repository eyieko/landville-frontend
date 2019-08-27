import { Injectable } from '@angular/core';
import { ClientCompanies } from 'src/app/models/Client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  fetchClientCompanies() {
    return this.http.get<ClientCompanies>(
      `${environment.api_url}/auth/clients/`
    );
  }
}
