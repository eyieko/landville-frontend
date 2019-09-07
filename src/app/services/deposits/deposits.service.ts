import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositsResponse } from 'src/app/models/Deposit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {
  DepositsUrl = '/transactions/my-deposit/';

  constructor(private http: HttpClient) {
  }

  getDeposits(): Observable<any> {
    return this.http.get<DepositsResponse>(`${ environment.apiUrl }${ this.DepositsUrl }`);
  }
}
