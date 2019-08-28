import { HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { JwtInterceptor } from './jwt.interceptor';
import { httpHandlerSpy, httpRequestSpy } from './spies';

const mockAuthService = jasmine.createSpyObj([ 'isLoggedIn' ]);

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
      imports: [ HttpClientTestingModule ]
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
