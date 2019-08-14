import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        LoginService.logout();
        // Navigate to custom error page
        this.router.navigate([ '/error401' ]);
      } else if (err.status === 403) {
        // Navigate to custom error page
        this.router.navigate([ '/error403' ]);
      } else if (err.status === 500) {
        // Navigate to custom error page
        this.router.navigate([ '/error500' ]);
      }

      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }

}
