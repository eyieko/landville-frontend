import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TransactionInformationService } from './transaction-information.service';
import { environment } from 'src/environments/environment';

describe('TransactionService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TransactionInformationService = TestBed.get(
      TransactionInformationService
    );
    expect(service).toBeTruthy();
  });

  it('should send a GET method', () => {
    const service: TransactionInformationService = TestBed.get(
      TransactionInformationService
    );
    const mockUrl = `${environment.api_url}/transactions/`;
    service.getTransactions().subscribe();
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
  });
});
