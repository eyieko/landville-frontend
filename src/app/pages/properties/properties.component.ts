import { PropertiesService } from './../../shared/services/properties/properties.service';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/Property';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  propertiesUrl =
    'https://landville-backend-web-api.herokuapp.com/api/v1/properties';
  next: string;
  previous: string;
  toggle: boolean = true;

  constructor(private propertiesServices: PropertiesService) {}

  ngOnInit(): void {
    this.setProperties(this.propertiesUrl);
  }

  setProperties(url: string) {
    this.propertiesServices.getProperties(url).subscribe(response => {
      this.properties = response.data.properties.results;
      if (response.data.properties.next) {
        this.next = response.data.properties.next;
      }

      if (response.data.properties.previous) {
        this.previous = response.data.properties.previous;
      }
    });
  }

  fetchNext() {
    this.setProperties(this.next);
  }

  fetchPrevious() {
    this.setProperties(this.previous);
  }

  toggleView() {
    this.toggle = !this.toggle;
  }
}
