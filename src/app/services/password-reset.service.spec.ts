import { TestBed } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
  });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PasswordResetService = TestBed.get(PasswordResetService);
    expect(service).toBeTruthy();
  });

  it('should trigger a service', () => {
    const service: PasswordResetService = TestBed.get(PasswordResetService);
    const mockData = {
      email: 'joel@andela.com'
    };
    service.getResetLink(mockData).subscribe();
    const req = httpMock.expectOne(`http://127.0.0.1:8000/api/v1/auth/password-reset/`);
    req.flush(mockData);
    });

  it('should trigger a service', () => {
      const service: PasswordResetService = TestBed.get(PasswordResetService);
      const mockData = {
        email: 'joelandela.com'
      };
      service.getResetLink(mockData).subscribe();
      const req = httpMock.expectOne(`http://127.0.0.1:8000/api/v1/auth/password-reset/`);
      req.flush(mockData);
      });
});
