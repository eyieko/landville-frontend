import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-property-description',
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.scss']
})
export class PropertyDescriptionComponent implements OnInit {
  @Input() createdAt: string;
  @Input() lotSize: string;
  @Input() description: string;
  @Input() video: string;
  @Input() purchasePlan: string;
  @Input() ifVideo: boolean

  constructor() { }

  ngOnInit() {
  }

}
