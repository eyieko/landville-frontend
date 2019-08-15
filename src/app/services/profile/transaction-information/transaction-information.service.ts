import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionInformationService {
  transacationUrl = `${environment.api_url}/transactions/`;
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(this.transacationUrl);
  }
}
