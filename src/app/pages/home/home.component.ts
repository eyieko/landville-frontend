import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PropertiesService } from 'src/app/services/properties/properties.service';
import { Property } from 'src/app/models/Property';

import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('searchForm') form: any;
  subscription: Subscription;
  trendingPropertiesUrl = `${environment.api_url}/properties/trending?city=`;
  trendingProperties: Property[] = [];

  constructor(
    private propertiesService: PropertiesService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.propertiesService
      .getProperties(this.trendingPropertiesUrl)
      .subscribe(
        ({ data: { property } }) => {
          this.trendingProperties = property.slice(0, 6);
        },
        _ => {
          this.toastService.error(
            'Something went wrong, we couldnt load the trending properties'
          );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
