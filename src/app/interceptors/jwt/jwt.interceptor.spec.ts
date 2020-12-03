import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { httpHandlerSpy, httpRequestSpy } from 'src/app/helpers/tests/spies';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtInterceptor } from './jwt.interceptor';

const mockAuthService = jasmine.createSpyObj(['isLoggedIn']);

describe('JWTInterceptor', () => {
  let jwtInterceptor: JwtInterceptor;
  let authService: AuthService;
  let service;
  let authServiceData;

  authServiceData = {
    currentUser: {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsImVtYWlsIjoib2dyZUB2aW1haWwyNC5jb20iLCJleHAiOjE1NjY2MzQxMDB9.5u2ylra-VwFb5qDjVsTVfcXPlGZlr9bGg54YyCwvkDA'
    },
    isLoggedIn: () => true
  }

  beforeEach(() => {
    jwtInterceptor = new JwtInterceptor(authService);

    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: HttpRequest, useValue: httpRequestSpy },
        { provide: HttpHandler, useValue: httpHandlerSpy },
      ],
      imports: [HttpClientTestingModule]
    });
  });

  const setUp = (authService: AuthService) => {
    service = new JwtInterceptor(authService)
  };

  it('should create', () => {
    setUp(authServiceData);
    expect(service).toBeTruthy();
  });

  it('should auto populate jwt headers in the request', () => {
    setUp(authServiceData);
    // arrange
    httpHandlerSpy.handle.and.returnValue(of({
      data: {
        message: 'data'
      }
    }));
    // act
    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {
          expect(result).toBeTruthy()
        },
      );
  });

  it('should currentUser', () => {
    setUp(authServiceData);
    httpHandlerSpy.handle.and.returnValue(of());
    service.intercept(httpRequestSpy, httpHandlerSpy).subscribe();
    expect(httpRequestSpy.clone).toHaveBeenCalledTimes(2)
  });

});
