import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientReviewService } from 'src/app/services/client-review.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from 'src/app/helpers/no-whitespace-validator'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewForm = new FormGroup({
    review: new FormControl('', [Validators.required, noWhitespaceValidator])
  });
  clientID;

  constructor(
    private reviewService: ClientReviewService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientID = params.get('clientId');
    });
  }
  get review() {
    return this.reviewForm.get('review');
  }

  submitReview() {
    const review = this.reviewForm.value;
    this.spinner.show();

    this.reviewService.createClientReview(this.clientID, review).subscribe(
      response => {
        this.spinner.hide();
        this.toastrService.success('Review added.', '', { timeOut: 3000 });
        this.router.navigate(['/auth', this.clientID, '/reviews']);
      },
      error => {
        this.spinner.hide();
        let toastMessage = '';
        if (!error.errors) {
          toastMessage = 'Server or network error happened!';
        } else {
          toastMessage = error.errors.detail ? error.errors.detail : error.errors;
        }
        this.toastrService.error(toastMessage);
      }
    );
  }
}
