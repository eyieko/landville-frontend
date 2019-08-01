import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {routerSpy} from './spies';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginService} from '../services/login/login.service';

class MockActivatedRouteSnapshot {
  private _data: any;
  get data() {
    return this._data;
  }
}

class MockRouter {
  navigate(path) {
  }
}

class MockRouterStateSnapshot {
  url = '/';
}

class MockLoginService {
  get currentUserValue(): string {
    return 'skdhasjkdhsajhd';
  }
}

describe('AuthGuard', () => {
  let router: Router;
  let authGuard: AuthGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot},
        {provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot},
        {provide: LoginService, useClass: MockLoginService},
      ],
      imports: [HttpClientTestingModule]
    });
    router = TestBed.get(Router);
    authGuard = TestBed.get(AuthGuard);
    state = TestBed.get(RouterStateSnapshot);
  });

  function forPrivateRoute() {
    route = TestBed.get(ActivatedRouteSnapshot);
    spyOnProperty(route, 'data', 'get').and.returnValue(true);
  }

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('Authenticated can access private route when logged in', () => {

    forPrivateRoute();
    expect(authGuard.canActivate(route, state)).toEqual(true);
  });
});
