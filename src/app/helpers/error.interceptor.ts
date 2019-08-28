import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.subscription.add(this.authService.logoutUser().subscribe(_ => {
          localStorage.clear();
          this.router.navigate([ '/login' ]);
        }));
      }

      this.subscription.unsubscribe();

      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }

}
