import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/Property';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('searchForm') form: any;
  subscription: Subscription;
  trendingProperties: Property[] = [];

  constructor(
    private propertiesService: PropertiesService,
    private toastService: ToastrService,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags, true);
    });


    this.subscription = this.propertiesService
      .getTrendingProperty()
      .subscribe(
        ({ data: { property } }) => {
          this.trendingProperties = property.slice(0, 6);
        },
        _ => {
          this.toastService.error(
            'Something went wrong, we could not load the trending properties'
          );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
