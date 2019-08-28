import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import { localStorageSpy } from 'src/app/helpers/spies';
import {RouterTestingModule} from '@angular/router/testing';

class MockRouter {
  navigate(path) { }
}

describe('AuthGuard', () => {
let MockAuthService;
let router;
let authGuard;
beforeEach(() => {
    MockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    router = new MockRouter();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LocalStorageService,
      {provide: {AuthService, useValue: MockAuthService}},
    ]
    });
    authGuard = new AuthGuard(MockAuthService, router);
    });

it(
'should setup the guard correctly',
inject([AuthGuard], (authGuard: AuthGuard) => {
expect(authGuard).toBeTruthy();
})
);

it('should activate', () => {
const next = {
url: '/'
};
const state = null;
MockAuthService.isLoggedIn.and.returnValue(true);
expect(authGuard.canActivate(next, state)).toBeTruthy();
});

it('should not activate', () => {
const next = {
url: '/'
};
const state = null;
MockAuthService.isLoggedIn.and.returnValue(false);
expect(authGuard.canActivate(next, state)).toBeFalsy();
});
});
