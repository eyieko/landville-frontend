import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/Property';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  propertiesUrl = `${environment.api_url}/properties`;
  next = '';
  previous = '';
  toggle = true;
  results: any[] = [];
  disabledNext = false;
  disabledPrevious = false;
  listToggle = false;
  gridToggle = true;
  count = 0;
  myProperties: any;
  isMine = true;
  client = 0;

  constructor(
    private propertiesServices: PropertiesService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getClient();
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags, true);
    });
    this.setProperties(this.propertiesUrl);
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  getClient() {
    this.profileService
      .getClients()
      .pipe(first())
      .subscribe(
        response => {
          this.client = response.data.data.client_company.id;
        },
        error => {
        return this.isMine = false;
        }
      );
  }

  setProperties(url: string) {
    this.spinner.show();
    this.propertiesServices.getProperties(url).subscribe(response => {
      this.results = response.data.properties.results;
      this.count = response.data.properties.count;
      if (this.results.length === 0) {
        this.router.navigate(['no-properties']);
        this.toastrService.success(
          'Sorry, No properties available now. Kindly check back later'
        );
      } else {
        this.properties = this.results;
        this.myProperties = this.properties.filter(({client: {id}}) => id === this.client);
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
}
