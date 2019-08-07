import { Injectable } from "@angular/core";
import { InternationalPayment } from "src/app/models";
import { Observable } from "rxjs";
import { HttpService } from "../http.service";
import { HttpMethods } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class InternationalPaymentService {
  constructor(private http: HttpClient) {}

  createInternationalPayment(payment: InternationalPayment): Observable<any> {
    return this.http.post<InternationalPayment>(
      `${environment.api_url}/transactions/card-foreign/`,
      payment
    );
  }
}
