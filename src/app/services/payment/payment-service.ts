import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { InternationalPayment } from 'src/app/models';
import { SavedCardResponse } from 'src/app/models/SavedCard';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  jwtHelper = new JwtHelperService();
  isDisplayedModal = false;

  constructor(private http: HttpClient) { }
  initiatePinPay(data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/transactions/card-pin/`,
      data).pipe(catchError(this.handleError));
  }

  validatePinPay(data: object): Observable<object> {
    return this.http.post<any>(
      `${environment.api_url}/transactions/validate-card/`,
      data).pipe(catchError(this.handleError));
  }

  payWithTokenizedCard(data: object, cardId: number): Observable<object> {
    return this.http.post<any>(
      `${environment.api_url}/transactions/tokenized-card/${cardId}`,
      data).pipe(catchError(this.handleError));
  }
  createInternationalPayment(payment: InternationalPayment): Observable<InternationalPayment> {
    return this.http.post<InternationalPayment>(
      `${environment.api_url}/transactions/card-foreign/`,
      payment
    );
  }
  getSavedCard(): Observable<SavedCardResponse> {
    return this.http.get<SavedCardResponse>(`${environment.api_url}/transactions/saved-cards/`);

  }
  deleteSavedCard(card: number): Observable<SavedCardResponse> {
    return this.http.delete<any>(`${environment.api_url}/transactions/saved-cards/${card}`);

  }
  displayModalService() {
    this.isDisplayedModal = this.isDisplayedModal ? false : true;
    return this.isDisplayedModal;
  }

  private handleError(err: HttpResponse<object>) {
    return throwError(err);
  }
}
