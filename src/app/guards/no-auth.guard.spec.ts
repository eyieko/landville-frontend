import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { AuthService } from 'src/app/services/auth.service';

class MockRouter {
  navigate(path) { }
}

describe('NoAuthGuard', () => {
  let authGuard: NoAuthGuard;
  let MockAuthService;
  let router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NoAuthGuard,
        LocalStorageService,
        { provide: { AuthService, useValue: MockAuthService } },
      ]
    });
    router = new MockRouter();
    MockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    authGuard = new NoAuthGuard(MockAuthService, router);
  });

  it(
    'should setup the guard correctly',
    inject([NoAuthGuard], (guard: NoAuthGuard) => {
      expect(guard).toBeTruthy();
    })
  );

  it('should return false for a logged in user', () => {
    MockAuthService.isLoggedIn.and.returnValue(true);
    expect(authGuard.canActivate()).toEqual(false);
  });

  it('should return true for a loggedout users', () => {
    MockAuthService.isLoggedIn.and.returnValue(false);
    expect(authGuard.canActivate()).toEqual(true);
  });
});
