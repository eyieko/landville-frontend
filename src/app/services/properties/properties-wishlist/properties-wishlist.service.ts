import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpMethods, APPCONFIG } from 'src/app/config';
import { HttpService } from 'src/app/services/http.service';
import { PropertiesWishlistResponse } from 'src/app/models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesWishlistService {
  wishlistUrl = '/properties/buyer-list/';

  constructor(private http: HttpService, private anotherHtpp: HttpClient) {}

  getMyWishlist(): Observable<any> {
    return this.anotherHtpp.get<PropertiesWishlistResponse[]>(`${APPCONFIG.base_url}${this.wishlistUrl}`);
  }

  addToWishlist(slug: string): Observable<any> {
    return this.http.makeRequestWithData(
      `${this.wishlistUrl}${slug}/`,
      null,
      HttpMethods.POST
    );
  }

  removeFromWishList(slug: string): Observable<any> {
    return this.anotherHtpp.delete(
      `${APPCONFIG.base_url}${this.wishlistUrl}${slug}/`,
    );
  }
}
