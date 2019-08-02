import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpService } from "../http.service";
import { LocalStorageService } from '../local-storage.service'

@Injectable({
    providedIn: "root"
})
export class PropertyDetailService {
    userToken = this.localStorageService.get('token', '');

    constructor(
        private http: HttpService,
        private localStorageService: LocalStorageService) { 
        
        };

    getProperty(slug): Observable<any> {
        console.log(slug)
        
        const httpOptions = {
            headers: new HttpHeaders({
            Authorization: `Bearer ${this.userToken}`

            }),
        };
        const endpoint = `properties/${slug}`
    
        return this.http.getRequestWithParams(endpoint, httpOptions);
    }
}