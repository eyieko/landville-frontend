import { TestBed } from '@angular/core/testing';

import { RegisterServiceService } from './register-service.service';

describe('RegisterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterServiceService = TestBed.get(RegisterServiceService);
    expect(service).toBeTruthy();
  });
});
