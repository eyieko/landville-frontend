import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { httpHandlerSpy, httpRequestSpy } from './spies';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { JwtInterceptor } from './jwt.interceptor';

const mockAuthService = jasmine.createSpyObj(['isLoggedIn']);

describe('JWTInterceptor', () => {
  let jwtInterceptor: JwtInterceptor;


  beforeEach(() => {
    jwtInterceptor = new JwtInterceptor(mockAuthService);

    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: HttpRequest, useValue: httpRequestSpy },
        { provide: HttpHandler, useValue: httpHandlerSpy },
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create', () => {
    expect(jwtInterceptor).toBeTruthy();
  });

  it('should auto populate jwt headers in the request', () => {
    // arrange
    httpHandlerSpy.handle.and.returnValue(of({
      data: {
        message: 'data'
      }
    }));
    // act
    jwtInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {

        },
      );
  });

});
