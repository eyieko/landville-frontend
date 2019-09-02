import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input() clientId: number;
  subscription: Subscription = new Subscription();
  count: number;
  results: any[];
  url: string;
  oneReview: any;
  profileImage: string;

  constructor(
    private reviewsService: ClientReviewsService,
    private router: Router,
    public spinner: NgxSpinnerService,

  ) {
    this.profileImage = 'assets/img/people.png';
   }

  ngOnInit() {
    this.fetchReviews();
  }
  fetchReviews() {
    this.spinner.show();
    const clientId = this.clientId;
    this.subscription.add(
      this.reviewsService.getReviews(clientId).subscribe(response => {
        this.results = response.results;
        this.oneReview = response.results[0];
        this.count = response.count;
        this.spinner.hide();
      },
       _ => {
          this.spinner.hide();
      })
    );
  }
  getMoreReviews(client: number) {
    this.spinner.show();
    this.router.navigate(['/auth', client, 'reviews']);
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

