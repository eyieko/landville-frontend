import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  image: string;
  oneReview: any;

  constructor(
    private reviewsService: ClientReviewsService,
    private router: Router,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
    this.fetchReviews();
  }
  fetchReviews() {
    const clientId = this.clientId;
    this.url = `${APPCONFIG.base_url}/auth/${clientId}/reviews/`;
    this.subscription.add(
      this.reviewsService.getReviews(this.url).subscribe(response => {
        this.results = response.results;
        this.oneReview = response.results[0];
      })
    )
  }
  getMoreReviews() {
    this.spinner.show();
    console.log(this.results);
    this.router.navigate(['auth', this.oneReview.client, 'reviews']);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

