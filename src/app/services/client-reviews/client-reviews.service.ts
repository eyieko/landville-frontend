import { Review } from 'src/app/models/client-reviews/review';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientReviewsService {

  constructor(private http: HttpClient) { }

  getReviews(endpoint: string): Observable<any> {
    return this.http.get<Review>(endpoint);
  }
  
}
