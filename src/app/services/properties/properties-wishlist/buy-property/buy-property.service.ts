import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Property } from 'src/app/models/Property';

@Injectable({
  providedIn: 'root'
})
export class BuyPropertyService {
  private property = new BehaviorSubject({purpose : '', property: {}});
  currentProperty = this.property.asObservable();
  constructor() { }


  changeProperty(property: Property, purpose: string) {
    this.property.next({property, purpose});
  }
}
