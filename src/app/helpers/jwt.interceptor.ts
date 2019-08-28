import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isLoggedIn()) {
      // add authorization header with jwt token if available
      const currentUser = localStorage.getItem('token');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ currentUser }`
        }
      });
    }
    return next.handle(request);
  }
}
