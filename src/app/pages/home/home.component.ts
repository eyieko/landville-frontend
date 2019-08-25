import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { Property } from 'src/app/models/Property';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

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
    private toastService: ToastrService,
    private titleService: Title, private metaService: Meta
  ) { }

  ngOnInit() {
    this.subscription = this.propertiesService
      .getProperties(this.trendingPropertiesUrl)
      .subscribe(
        ({ data: { property } }) => {
          this.trendingProperties = property.slice(0, 6);
        },
        _ => {
          this.toastService.error(
            'Something went wrong, we could not load the trending properties'
          );

          this.titleService.setTitle('Home | Make that Property yours Today');
          this.metaService.addTags([
            // Open Graph Data
            { property: 'og:title', content: 'Home | Make that Property yours Today' },
            {
              property: 'og:description',
              content: 'We help you invest your money in real estate with the best and the safest technology means'
            },
            { property: 'og:image', content: '../../../assets/img/ICON/Logo.png' },
            // Twitter
            { name: 'twitter:card', content: 'LandVille' },
            { name: 'twitter:title', content: 'Home | Make that Property yours Today' },
            {
              name: 'twitter:description',
              content: 'We help you invest your money in real estate with the best and the safest technology means'
            },
            { name: 'twitter:image', content: '../../../assets/img/ICON/Logo.png' }
          ]);
        });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
