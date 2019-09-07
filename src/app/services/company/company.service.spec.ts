import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { CompanyService } from 'src/app/services/company/company.service';
import { environment } from 'src/environments/environment';

describe('CompanyService', () => {
  const payload = {
    client_name: 'saf',
    phone: '+234 123 4567890',
    email: 'alpha@mailinator.com',
    address: {
      Street: 'Street',
      City: 'City',
      State: 'State'
    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    declarations: [],
    providers: [],
  }));

  it('should be created', () => {
    const service: CompanyService = TestBed.get(CompanyService);
    expect(service).toBeTruthy();
  });

  it('should should perform create company correctly', fakeAsync(
    inject([ CompanyService, HttpTestingController ],
      (service: CompanyService, backend: HttpTestingController) => {
        // Set up
        const url = `${ environment.apiUrl }/auth/client/`;
        const responseObject = {
          success: true,
          message: 'created was successful'
        };
        let response = null;

        service.createCompany(payload).subscribe((receivedResponse: any) => {
          response = receivedResponse;
        });
        const requestWrapper = backend.expectOne({ url });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('POST');

      })
  ));

  it('should should perform get company details correctly', fakeAsync(
    inject([ CompanyService, HttpTestingController ],
      (service: CompanyService, backend: HttpTestingController) => {
        // Set up
        const url = `${ environment.apiUrl }/auth/client/`;
        const responseObject = {
          success: true,
          message: 'here is your payload.'
        };
        let response = null;

        service.getCompanyDetails().subscribe((receivedResponse: any) => {
          response = receivedResponse;
        });
        const requestWrapper = backend.expectOne({ url });
        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('GET');

      })
  ));
});
