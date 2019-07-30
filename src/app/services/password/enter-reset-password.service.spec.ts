import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnterResetPasswordService } from './enter-reset-password.service';

describe('EnterResetPasswordService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
  });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EnterResetPasswordService = TestBed.get(EnterResetPasswordService);
    expect(service).toBeTruthy();
  });


  it('should trigger a service', () => {
    const service: EnterResetPasswordService = TestBed.get(EnterResetPasswordService);
    const mockData = {
      newPassword: 'akram100',
      confirmPassword: 'akram100'
    };
    // const
    service.changePassword('token', mockData).subscribe();
    const req = httpMock.expectOne(`http://127.0.0.1:8000/api/v1/auth/password-reset/?token=token`);
    req.flush(mockData);
    });
});
