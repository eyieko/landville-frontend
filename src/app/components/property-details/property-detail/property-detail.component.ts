import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  @Input() title: string;
  @Input() street: string;
  @Input() state: string;
  @Input() city: string;
  @Input() price: string;
  @Input() imageMain: string;
  @Input() imageOthers: any[] = [];
  @Input() bathrooms: string;
  @Input() garages: string;
  @Input() bedrooms: string;
  @Input() ifBuilding: boolean;

  constructor() {}

  ngOnInit() {}
}
