import { inject, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { routerSpy } from './spies';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockActivatedRouteSnapshot {
  private _data: any;
  get data() {
    return this._data;
  }
}

class MockRouterStateSnapshot {
  url = '/';
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
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRouteSnapshot,
          useClass: MockActivatedRouteSnapshot
        },
        { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
      ],
      imports: [HttpClientTestingModule]
    });
    router = TestBed.get(Router);
    authGuard = TestBed.get(AuthGuard);
    state = TestBed.get(RouterStateSnapshot);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
