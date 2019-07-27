import { TestBed } from '@angular/core/testing';

import { EnterResetPasswordService } from './enter-reset-password.service';

describe('EnterResetPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterResetPasswordService = TestBed.get(EnterResetPasswordService);
    expect(service).toBeTruthy();
  });
});
