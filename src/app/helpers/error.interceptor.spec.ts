import { HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';
import { httpHandlerSpy, httpRequestSpy } from './spies';


describe('ErrorInterceptor', () => {
  let errorInterceptor: ErrorInterceptor;

  beforeEach(() => {
    // @ts-ignore
    errorInterceptor = new ErrorInterceptor();

    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptor,
        {provide: HttpRequest, useValue: httpRequestSpy},
        {provide: HttpHandler, useValue: httpHandlerSpy},
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create', () => {
    expect(errorInterceptor).toBeTruthy();
  });

  it('should auto logout if 401 response returned from api', () => {
    // arrange
    httpHandlerSpy.handle.and.returnValue(throwError({
      error: {
        message: 'test-error'
      }
    }));
    // act
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          console.log('error', err);
          expect(err).toEqual({
            message: 'test-error'
          });
        }
      );
  });

});
