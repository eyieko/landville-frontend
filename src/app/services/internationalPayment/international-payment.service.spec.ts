import { TestBed, fakeAsync, inject, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { ReactiveFormsModule, FormGroup, FormsModule } from "@angular/forms";
import { environment } from "../../../environments/environment";

import { InternationalPaymentService } from "./international-payment.service";
import { PaymentsComponent } from "src/app/pages/payments/payments.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe("InternationalPaymentService", () => {
  const payload = {
    cardno: 5399838383838381,
    cvv: "470",
    expirymonth: "01",
    expiryyear: "21",
    amount: 8800,
    billingzip: "07205",
    billingcity: "billingcity",
    billingaddress: "billingaddress",
    billingstate: "NJ",
    billingcountry: "UK",
    save_card: true,
    purpose: "Saving"
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      declarations: [PaymentsComponent],
      providers: [InternationalPaymentService]
    })
  );

  it("should make international payment correctly", fakeAsync(
    inject(
      [InternationalPaymentService, HttpTestingController],
      (
        service: InternationalPaymentService,
        backend: HttpTestingController
      ) => {
        // Set up
        const url = `${environment.api_url}/transactions/card-foreign/`;
        const responseObject = {
          success: true,
          message: "created was successful"
        };
        let response = null;

        service
          .createInternationalPayment(payload)
          .subscribe((receivedResponse: any) => {
            response = receivedResponse;
          });
        const requestWrapper = backend.expectOne({ url });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual("POST");
      }
    )
  ));
});
