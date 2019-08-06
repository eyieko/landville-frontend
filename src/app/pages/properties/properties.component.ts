import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertiesService } from './../../services/properties/properties.service';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/Property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  propertiesUrl =
    'https://landville-backend-web-api.herokuapp.com/api/v1/properties';
  next: string = '';
  previous: string = '';
  toggle: boolean = true;
  results: any[] = [];
  disabledNext: boolean = false;
  disabledPrevious: boolean = false;

  constructor(
    private propertiesServices: PropertiesService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setProperties(this.propertiesUrl);
  }

  setProperties(url: string) {
    this.propertiesServices.getProperties(url).subscribe(response => {
      this.spinner.show();
      this.results = response.data.properties.results;
      if (this.results.length === 0) {
        this.router.navigate(['no-properties']);
        this.toastrService.success(
          'Sorry, No properties available now. Kindly Come back later'
        );
      } else {
        this.properties = this.results;

        if (response.data.properties.next) {
          this.next = response.data.properties.next;
        } else {
          this.disabledNext = true;
        }

        if (response.data.properties.previous) {
          this.previous = response.data.properties.previous;
        } else {
          this.disabledPrevious = true;
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  fetchNext() {
    this.disabledNext = false;
    this.disabledPrevious = false;
    this.setProperties(this.next);
  }

  fetchPrevious() {
    this.disabledPrevious = false;
    this.disabledNext = false;
    this.setProperties(this.previous);
  }

  toggleView() {
    this.toggle = !this.toggle;
  }
}
