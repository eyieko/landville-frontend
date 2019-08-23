import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { APPCONFIG } from 'src/app/config';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class PropertyDetailService {
  constructor(
    private http: HttpService,
    private https: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  getProperty(slug): Observable<any> {
    const endpoint = `/properties/${slug}`;
    return this.http.getRequestWithParams(endpoint);
  }

  updateProperty(slug, data): Observable<any> {
    const endpoint = `/properties/${slug}/`;
    return this.https.patch<any>(
      `${APPCONFIG.base_url}${endpoint}`,
      data
    );
  }
}
