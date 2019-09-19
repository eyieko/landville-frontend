import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailService {
  isDisplayedModal = false;
  constructor(private http: HttpService) {}

  getProperty(slug): Observable<any> {
    const endpoint = `/properties/${slug}`;
    return this.http.getRequestWithParams(endpoint);
  }

  displayModalService() {
    this.isDisplayedModal = this.isDisplayedModal ? false : true;
    return this.isDisplayedModal;
  }
  deletePropertyService(slug): Observable<any> {
    const url = `/properties/${slug}`;
    const response = this.http.deleteRequestWithParams(url);
    return response;
  }
}
