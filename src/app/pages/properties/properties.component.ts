import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertiesService } from './../../services/properties/properties.service';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/Property';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  propertiesUrl =
    'https://landville-backend-web-api.herokuapp.com/api/v1/properties';
  next = '';
  previous = '';
  toggle = true;
  results: any[] = [];
  disabledNext = false;
  disabledPrevious = false;
  listToggle = false;
  gridToggle = true;
  count = 0;

  constructor(
    private propertiesServices: PropertiesService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.setProperties(this.propertiesUrl);
    this.setPageMetaData();
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
  setProperties(url: string) {
    this.spinner.show();
    this.propertiesServices.getProperties(url).subscribe(response => {
      this.results = response.data.properties.results;
      this.count = response.data.properties.count;
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
      this.spinner.hide();
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
    this.listToggle = !this.listToggle;
    this.gridToggle = !this.gridToggle;
  }

  private setPageMetaData() {
    this.titleService.setTitle('All Properties | Acquire your dream property with ease today');
    this.metaService.addTags(
      [
        // Open Graph Data
        { property: 'og:title', content: 'All Properties | Acquire your dream property with ease today' },
        {
          property: 'og:description',
          content: 'Browse a wide range of the best property across Nigeria'
        },
        // Twitter
        { name: 'twitter:title', content: 'All Properties | Acquire your dream property with ease today' },
        { name: 'twitter:description', content: 'Browse a wide range of the best property across Nigeria' },
      ]);
  }
}
