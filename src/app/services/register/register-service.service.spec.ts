import { TestBed } from '@angular/core/testing';

import { RegisterServiceService } from './register-service.service';
import {HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Registerdetails } from '../../models/register/register-details';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


describe('RegisterServiceService', () => {
  let httpMock: HttpTestingController;
  // let toastr = () => ({ success: ''});
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
    // providers: [{provide: ToastrService, useValue: toastr}, {provide: NgxSpinnerService}]
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
    const mockData: Registerdetails = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne(`${service.registerUrl}/register`);
    req.flush(mockData);
    });
  it('should use the right url', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    const mockData: Registerdetails = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne(`${service.registerUrl}/register`);
    expect(req.request.url).toBe(`${service.registerUrl}/register`);
  });
  it('should use POST method', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    const mockData: Registerdetails = {
      email: 'akram@andela.com',
      first_name: 'akram', last_name: 'mukasa', role: 'CA',
      password: 'akram100', confirmed_password: 'akram100', data: ''
    };
    service.registerUser(mockData).subscribe();
    const req = httpMock.expectOne(`${service.registerUrl}/register`);
    expect(req.request.method).toBe('POST');
  });
  // it('should return write response', () => {
  //   const someObject = spyOn(toastr, 'success').and.returnValue();
  //   const service: RegisterServiceService = TestBed.get(RegisterServiceService);
  //   const mockData: Registerdetails = {
  //     email: 'akram@andela.com',
  //     first_name: 'akram', last_name: 'mukasa', role: 'CA',
  //     password: 'akram100', confirmed_password: 'akram100', data: ''
  //   };
  //   service.registerUser(mockData).subscribe();
  //   expect(someObject.success).toHaveBeenCalled();
  //   const req = httpMock.expectOne(`${service.registerUrl}/register`);
  // });


});

