import { PaymentService } from './payment-service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('PaymentService', () =>{
	let httpTestingController: HttpTestingController;
	let service: PaymentService;

	beforeEach(() => {
		TestBed.configureTestingModule({
				providers: [
				PaymentService,
			],
			imports: [ HttpClientTestingModule ]
		});
		httpTestingController = TestBed.get(HttpTestingController)
		service = TestBed.get(PaymentService)
	});
	afterEach(() => {
    httpTestingController.verify();
	});
	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	it('should call initiatePinPay with the correct URL', ()=>{
		service.initiatePinPay({"cardno": 111}).subscribe();
		const req = httpTestingController.expectOne(`${environment.api_url}/transactions/card-pin/`);
		req.flush({'message': 'success'})
	});
	it('should call validatePinPay with the correct URL', ()=>{
		service.validatePinPay({"otp": 111}).subscribe();
		const req = httpTestingController.expectOne(`${environment.api_url}/transactions/validate-card/`);
		req.flush({'message': 'success'})
	});

	it('should call payWithTokenized with the correct URL', ()=>{
		service.payWithTokenizedCard({"otp": 111}).subscribe();
		const req = httpTestingController.expectOne(`${environment.api_url}/transactions/tokenized-card/`);
		req.flush({'message': 'success'})
	});

	it('should throw an error if error is returned from the http call', ()=>{
		let response: any;
		let errResponse: any;
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		service.validatePinPay({"otp": 111}).subscribe(res => response = res, err => errResponse = err);
		const req = httpTestingController.expectOne(`${environment.api_url}/transactions/validate-card/`);
		req.flush({'message': 'success'}, mockErrorResponse)
	});
});
