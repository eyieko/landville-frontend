import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { APPCONFIG } from 'src/app/config';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
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

  constructor(private reviewsService: ClientReviewsService) { }

  ngOnInit() {
    this.fetchReviews();
  }
  fetchReviews() {
    this.url = `${APPCONFIG.base_url}/auth/${this.clientId}/reviews/`;
    this.subscription.add(
      this.reviewsService.getReviews(this.url).subscribe(response => {
        this.results = response.results
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

