import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailService {
    constructor(
        private http: HttpService) {
        }
    getProperty(slug): Observable<any> {

        const endpoint = `/properties/${slug}`;   
        return this.http.getRequestWithParams(endpoint);
    }
}
