import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  subscription = new Subscription();
  constructor(private loginService: LoginService, private router: Router, private localStorageService: LocalStorageService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.subscription.add(this.loginService.logoutUser().subscribe(_ => {
          this.localStorageService.clear();
          this.router.navigate(['/login']);
        }));
      }

      this.subscription.unsubscribe();
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }

}
