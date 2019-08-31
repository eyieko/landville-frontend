import { Review } from 'src/app/models/client-reviews/review';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ClientReviewsService {

  constructor(private http: HttpClient) { }
 
  getReviews(endpoint: string): Observable<any> {
    return this.http.get<Review>(endpoint);
  }
  
}
