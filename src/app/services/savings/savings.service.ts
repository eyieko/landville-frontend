import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  selectedYear:any;
  savingsUrl = `${environment.api_url}/transactions/`;

  constructor(private http: HttpClient) {}

  getSavings(): Observable<any> {
    return this.http.get(this.savingsUrl);
  }

  getSelectedYear(year) {
    console.log('service', year);
    this.getSelectedYear = year;
    return this.getSelectedYear;
  }
}
