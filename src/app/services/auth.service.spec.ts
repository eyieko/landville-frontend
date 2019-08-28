import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
  TestBed.configureTestingModule({});
  service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be falsy if there is no token set', () => {
    localStorage.setItem('tokenn', 'test');
    expect(service.isLoggedIn()).toBeFalsy();
  });
  it('should return false if a token is not valid JWT', () => {
    localStorage.setItem('token', 'test');
    expect(service.isLoggedIn()).toEqual(false);
  });
  it('should return false when the token is expired', () => {
    localStorage.setItem(
  'token',
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFoZWJ3YTEiLCJlbWFpbCI6ImNyeWNldHJ1bHlAZ21haWwuY29tIiwiZXhwIjoxNTUxNzc2Mzk0fQ.PFimaBvSaxR_cKwLmeRMod7LHkhNTcem22IXTrrg7Ko'
  );
    expect(service.isLoggedIn()).toEqual(false);
    });
  });
