import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import {
  mockProfileResponse,
  mockUpdatedProfileResponse
} from '../../utils/mocks/mocks';
import { LocalStorageService } from '../local-storage.service';

describe('ProfileService', () => {
  let httpMock: HttpTestingController;
  let service: ProfileService;
  let storage: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService, LocalStorageService]
    });
    service = TestBed.get(ProfileService);
    httpMock = TestBed.get(HttpTestingController);
    storage = TestBed.get(LocalStorageService);
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
    const request = httpMock.expectOne(`${service.profileUrl}`);
    request.flush(mockProfileResponse);
  });
  it('Should use the GET method', () => {
    service.getProfile().subscribe();
    const req = httpMock.expectOne(`${service.profileUrl}`);
    expect(req.request.method).toBe('GET');
  });
  it('updateProfile should successfully update user profile', () => {
    service.updateProfile({ first_name: 'Updated' }).subscribe(profile => {
      expect(profile.data.profile.user.first_name).toBe(
        mockUpdatedProfileResponse.data.profile.user.first_name
      );
    });
    storage.set('token', 'dummyAuthenticationToken');
    const request = httpMock.expectOne(`${service.profileUrl}`);
    request.flush(mockUpdatedProfileResponse);
  });
});
