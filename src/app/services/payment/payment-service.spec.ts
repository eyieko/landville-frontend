import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let httpTestingController: HttpTestingController;
  let service: PaymentService;
  const payload = {
    cardno: '5399838383838381',
    cvv: '470',
    expirymonth: '01',
    expiryyear: '21',
    amount: '8800',
    billingzip: '07205',
    billingcity: 'billingcity',
    billingaddress: 'billingaddress',
    billingstate: 'NJ',
    billingcountry: 'UK',
    save_card: true,
    purpose: 'Saving'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule ],

    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PaymentService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call initiatePinPay with the correct URL', () => {
    service.initiatePinPay({ cardno: 111 }).subscribe();
    const req = httpTestingController.expectOne(`${ environment.apiUrl }/transactions/card-pin/`);
    req.flush({ message: 'success' });
  });
  it('should call validatePinPay with the correct URL', () => {
    service.validatePinPay({ otp: 111 }).subscribe();
    const req = httpTestingController.expectOne(`${ environment.apiUrl }/transactions/validate-card/`);
    req.flush({ message: 'success' });
  });

  it('should call payWithTokenized with the correct URL', () => {
    service.payWithTokenizedCard({ otp: 111 }).subscribe();
    const req = httpTestingController.expectOne(`${ environment.apiUrl }/transactions/tokenized-card/`);
    req.flush({ message: 'success' });
  });

  it('should throw an error if error is returned from the http call', () => {
    let response: any;
    let errResponse: any;
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    service.validatePinPay({ otp: 111 }).subscribe(res => response = res, err => errResponse = err);
    const req = httpTestingController.expectOne(`${ environment.apiUrl }/transactions/validate-card/`);
    req.flush({ message: 'success' }, mockErrorResponse);
  });

  it('should make international payment correctly', fakeAsync(
    inject(
      [ PaymentService, HttpTestingController ],
      (
        service: PaymentService,
        backend: HttpTestingController
      ) => {
        // Set up
        const url = `${ environment.apiUrl }/transactions/card-foreign/`;
        const responseObject = {
          success: true,
          message: 'created was successful'
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

        expect(requestWrapper.request.method).toEqual('POST');
      }
    )
  ));
});
