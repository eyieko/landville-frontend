import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { mockProfileResponse, mockUpdatedProfileResponse } from '../../shared/mocks';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let httpMock: HttpTestingController;
  let service: ProfileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProfileService ]
    });
    service = TestBed.get(ProfileService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    // no HTTP requests should be pending/unhandled after the tests
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getProfile should return a user profile', (done: DoneFn) => {
    service.getProfile().subscribe(profile => {
      expect(profile).toBe(mockProfileResponse);
      done();
    });
    const request = httpMock.expectOne(
      `${ environment.apiUrl }${ service.profileUrl }`
    );
    request.flush(mockProfileResponse);
  });
  it('Should use the GET method', () => {
    service.getProfile().subscribe();
    const req = httpMock.expectOne(
      `${ environment.apiUrl }${ service.profileUrl }`
    );
    expect(req.request.method).toBe('GET');
  });
  it('updateProfile should successfully update user profile', () => {
    service.updateProfile({ first_name: 'Updated' }).subscribe(profile => {
      expect(profile.data.profile.user.first_name).toBe(
        mockUpdatedProfileResponse.data.profile.user.first_name
      );
    });
    localStorage.setItem('token', 'dummyAuthenticationToken');
    const request = httpMock.expectOne(
      `${ environment.apiUrl }${ service.profileUrl }`
    );
    request.flush(mockUpdatedProfileResponse);
  });
  it('pushProfile should push the most recent profile to the userProfile$ subject', () => {
    service.pushProfile();
    const req = httpMock.expectOne(
      `${ environment.apiUrl }${ service.profileUrl }`
    );
    expect(req.request.method).toBe('GET');
    expect(service.userProfile$).toBeDefined();
  });
});
