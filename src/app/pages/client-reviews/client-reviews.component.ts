import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APPCONFIG } from 'src/app/config';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.scss']
})
export class ClientReviewsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  id: number;
  count: number;
  review: string;
  reviewer: any;
  createdAt: string;
  replies: Array<any>[];
  results: any[];
  url: string;
  next: string;
  prev: string;
  disabledNext: boolean = false;
  disabledPrev: boolean = false;

  constructor(
    private reviewsService: ClientReviewsService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,

  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(result => {
      const clientId = result.get('clientId');
      this.url = `${APPCONFIG.base_url}/auth/${clientId}/reviews/`;
      console.log(this.url)
      this.fetchReviews(this.url);
    })
  }
  fetchReviews(url) {
    this.subscription.add(
      this.reviewsService.getReviews(url).subscribe(response => {
        this.results = response.results
        console.log(response)
        this.count = response.count;
        if (response.next) {
          this.next = response.next
        } else {
          this.disabledNext = true;
        }
        if (response.previous) {
          this.prev = response.previous
        } else {
          this.disabledPrev = true
        }
      }, error => {
        this.toastrService.error("Client not found");
        this.router.navigate(['/home']);
        this.spinner.hide();
      }
      )
    )
  }
  fetchPrev() {
    this.disabledPrev = false
    this.disabledNext = false
    this.fetchReviews(this.prev)
  }
  fetchNext() {

    this.disabledNext = false
    this.disabledPrev = false
    this.fetchReviews(this.next)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
