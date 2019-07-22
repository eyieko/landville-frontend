import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = this.localStorageService.get('token', '');
    if (userToken) {
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`)
      });
      return next.handle(req);
    }
  }
}
