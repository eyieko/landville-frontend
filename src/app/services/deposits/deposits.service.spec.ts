import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DepositsService } from 'src/app/services/deposits/deposits.service';
import { environment } from 'src/environments/environment';

describe('DepositsService', () => {
  let httpMock: HttpTestingController;
  let service: DepositsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: []
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(DepositsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET method', () => {
    const mockUrl = `${ environment.apiUrl }/transactions/my-deposit/`;
    service.getDeposits().subscribe();
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
  });
});
