import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientReviewService {

  constructor(private http: HttpClient) { }

  createClientReview(clientID: number, data: object): Observable<object> {
    return this.http.post<any>(`${environment.api_url}/auth/${clientID}/reviews/`,
      data).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpResponse<object>) {
    return throwError(error);
  }
}
