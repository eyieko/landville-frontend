import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ClientsService ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should use a Get method', () => {
    const service: ClientsService = TestBed.get(ClientsService);
    service.fetchClientCompanies().subscribe();

    const req = httpMock.expectOne(`${ environment.apiUrl }/auth/clients/`);
    req.flush({});
    expect(req.request.method).toBe('GET');
  });
});
