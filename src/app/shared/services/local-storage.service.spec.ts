import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    })
  );

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
  it('should get keys from localStorage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    localStorage.setItem('token', 'testToken');
    const token = service.get('token', '');
    expect(token).toBe('testToken');
  });
  it('should set keys to localStorage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    service.set('anothertoken', 'anothertesttoken');
    const token = service.get('anothertoken', '');
    expect(token).toBe('anothertesttoken');
  });
});
