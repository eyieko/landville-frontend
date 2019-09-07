import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InternationalPayment } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  initiatePinPay(data: object): Observable<object> {
    return this.http.post<any>(`${ environment.apiUrl }/transactions/card-pin/`,
      data).pipe(catchError(this.handleError));
  }

  validatePinPay(data: object): Observable<object> {
    return this.http.post<any>(
      `${ environment.apiUrl }/transactions/validate-card/`,
      data).pipe(catchError(this.handleError));
  }

  payWithTokenizedCard(data: object): Observable<object> {
    return this.http.post<any>(
      `${ environment.apiUrl }/transactions/tokenized-card/`,
      data).pipe(catchError(this.handleError));
  }

  createInternationalPayment(payment: InternationalPayment): Observable<InternationalPayment> {
    return this.http.post<InternationalPayment>(
      `${ environment.apiUrl }/transactions/card-foreign/`,
      payment
    );
  }

  private handleError(err: HttpResponse<object>) {
    return throwError(err);
  }
}
