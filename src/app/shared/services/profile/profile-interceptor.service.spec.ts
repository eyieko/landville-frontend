import { TestBed } from '@angular/core/testing';

import { ProfileInterceptorService } from './profile-interceptor.service';
import { LocalStorageService } from '../local-storage.service';

describe('ProfileInterceptorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    })
  );

  it('should be created', () => {
    const service: ProfileInterceptorService = TestBed.get(
      ProfileInterceptorService
    );
    expect(service).toBeTruthy();
  });
});
