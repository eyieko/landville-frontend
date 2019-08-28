import { localStorageSpy } from 'src/app/helpers/spies';
import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import {LocalStorageService} from 'src/app/services/local-storage.service';

class MockRouter {
  navigate(path) { }
}

describe('AuthGuard', () => {
let MockAuthService;
let router;
let authGuard;
let MockLocalStorageService;
beforeEach(() => {
    MockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    MockLocalStorageService = jasmine.createSpyObj(['get', 'set', 'clear']);
    router = new MockRouter();
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [{
      provide: {AuthService, useValue: MockAuthService}
    },
      {provide: {LocalStorageService, useValue: MockLocalStorageService}}
    ,
      AuthGuard,
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
