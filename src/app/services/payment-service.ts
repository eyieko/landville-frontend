import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}
  initiatePinPay(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/transactions/card-pin/`,
    data).pipe(catchError(this.handleError));
  }

  validatePinPay(data: object): Observable<object> {
    return this.http.post<any>(
      `${environment.api_url}/transactions/validate-card/`,
      data).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpResponse<object>) {
    return throwError(err);
  }
}
