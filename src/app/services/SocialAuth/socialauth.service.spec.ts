import { TestBed } from '@angular/core/testing';
import { LoginService } from './socialauth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { APPCONFIG } from 'src/app/config';

describe('Test for Loginservice', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let service: LoginService;
  let httpMock: HttpTestingController;
  let googleUrl;
  let facebookUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    // inject service
    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
    googleUrl = APPCONFIG.base_url + '/auth/google/';
    facebookUrl = APPCONFIG.base_url + '/auth/facebook/';
  });

  it('should create a google user and return token', () => {
    service.createGoogleUser('kelvinonkundi').subscribe((data: any) => {
      expect(data.token).toBe('noooovak');
    });
    spyOn(service, 'createGoogleUser').and.returnValue(of({ data: 'data' }));
    const mockurl = httpMock.expectOne(googleUrl, 'call to api');

    expect(mockurl.request.method).toBe('POST');
  });

  it('should create a facebook user and return results', () => {
    service.createFacebookUser('kjskjsjdskdjskdsdsdjsdkjs').subscribe((data: any) => {
      expect(data.token).toBe('noooovak');
    });
    const mockurl = httpMock.expectOne(facebookUrl, 'call to api');

    expect(mockurl.request.method).toBe('POST');
  });
});
