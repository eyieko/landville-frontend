import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnterResetPasswordService } from './enter-reset-password.service';
import { APPCONFIG } from 'src/app/config';

describe('EnterResetPasswordService', () => {
  let httpMock: HttpTestingController;
  const url = `${APPCONFIG.base_url}/auth/password-reset/?token=token`;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ],
  });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create EnterResetPasswordService', () => {
    const service: EnterResetPasswordService = TestBed.get(EnterResetPasswordService);
    expect(service).toBeTruthy();
  });

  it('should trigger a service valid password inputs', () => {
    const service: EnterResetPasswordService = TestBed.get(EnterResetPasswordService);
    const mockData = {
      newPassword: 'akram100',
      confirmPassword: 'akram100'
    };
    service.changePassword('token', mockData).subscribe();
    const req = httpMock.expectOne(url);
    req.flush(mockData);
    });
});
