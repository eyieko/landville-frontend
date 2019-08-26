import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { APPCONFIG } from 'src/app/config';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.scss']
})
export class ClientReviewsComponent implements OnInit {
  @Input() clientId: number;
  subscription: Subscription = new Subscription();
  id: number;
  count: number;
  review: string;
  reviewer: any;
  createdAt: string;
  replies: Array<any>[];
  results: any[];
  url: string;
  islongText: boolean = false;

  constructor(private reviewsService: ClientReviewsService) { }

  ngOnInit() {
    this.fetchReviews();
  }
  fetchReviews() {
    this.url = `${APPCONFIG.base_url}/auth/${this.clientId}/reviews/`;
    this.subscription.add(
      this.reviewsService.getReviews(this.url).subscribe(response => {
        this.results = response.results
        console.log(response.results)
        this.count = response.count
        // this.showLongText(string)
        // this.createdAt = response.result

      })
    )
  }
  // showLongText(string) {
  //   const len = string.split(' ').length;
  //   if (len >= 15) {
  //     this.islongText = true
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
