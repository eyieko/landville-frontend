import { environment } from 'src/environments/environment';
import { Review } from 'src/app/models/client-reviews/review';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientReviewsService {

  constructor(private http: HttpClient) { }
  getReviews(clientId: number): Observable<any> {
    const reviewsUrl = `${environment.api_url}/auth/${clientId}/reviews/`;
    return this.http.get<Review>(reviewsUrl);
  }
}
