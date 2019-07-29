import { TestBed } from '@angular/core/testing';

import { RegisterServiceService } from './register-service.service';
import {HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../models/register/register-details';
import { APPCONFIG } from '../../config';



describe('RegisterServiceService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
  });
    httpMock = TestBed.get(HttpTestingController);
  }
  );

  it('should be created', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    expect(service).toBeTruthy();
  });
  it('should trigger a service', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    const url = APPCONFIG.base_url + service.registerUrl;
    const mockData: User = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne({url});
    req.flush(mockData);
    });
  it('should use the right url', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    const url = APPCONFIG.base_url + service.registerUrl;
    const mockData: User = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne({url});
    // expect(req.request.url).toBe({});
  });
  it('should use POST method', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    const url = APPCONFIG.base_url + service.registerUrl;
    const mockData: User = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne({url});
    expect(req.request.method).toBe('POST');
  });

});

