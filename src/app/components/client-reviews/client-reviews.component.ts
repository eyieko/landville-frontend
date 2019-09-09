import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reply } from 'src/app/models/client-reviews/review';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.scss']
})
export class ClientReviewsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  count: number;
  results: any[];
  url: string;
  next: string;
  prev: string;
  disabledNext = true;
  disabledPrev = true;
  profileImage: string;
  replyUrl: string;
  replyPost: Reply[];
  reviewId: number;
  addReplyToReview: FormGroup;

  constructor(
    private reviewsService: ClientReviewsService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.profileImage = 'assets/img/people.png';
    this.addReplyToReview = this.formBuilder.group({
      reply: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe(result => {
      const clientId = result.get('clientId');
      this.fetchReviews(clientId);
    });
  }
  fetchReviews(clientId) {
    this.subscription.add(
      this.reviewsService.getReviews(clientId).subscribe(response => {
        this.results = response.results;
        this.count = response.count;
        if (response.next) {
          this.next = response.next;
          this.disabledNext = false;
        }
        if (response.previous) {
          this.prev = response.previous;
          this.disabledPrev = false;
        }
        this.spinner.hide();
      }, error => {
        this.toastrService.error('No reviews yet');
        this.spinner.hide();
      }
      )
    );
  }
  fetchPrev() {
    this.disabledPrev = true;
    this.disabledNext = true;
    this.fetchReviews(this.prev);
  }
  fetchNext() {

    this.disabledNext = true;
    this.disabledPrev = true;
    this.fetchReviews(this.next);
  }

  replyToReview(reviewId: number) {
    this.reviewId = reviewId;
  }
  replyReview() {
    const data = this.addReplyToReview.value;
    this.subscription.add(
      this.reviewsService.replyToReviews(this.reviewId, data).subscribe(
        response => {
          this.toastrService.success(data.reply);
        },
        err => {
          this.toastrService.error(err.errors.detail || err.errors);
          this.spinner.hide();
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
