import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './tokenized-card.component.html',
  styleUrls: ['../payment.component.scss']
})
export class TokenizedCardComponent implements OnInit {
  cardForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    purpose: new FormControl('', Validators.required)
  });

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private location: Location
    ,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
  }
  onSubmit(): void {
    const payload = {
      amount: this.cardForm.value.amount,
      purpose: this.cardForm.value.purpose
    };
    this.spinner.show();
    this.paymentService.payWithTokenizedCard(payload).subscribe(
      resp => {
        this.spinner.hide();
        this.router.navigate(['/user/deposits']);
        this.toastr.success(resp['message']);
      },
      error => {
        this.spinner.hide();
        let toastMessage = '';
        if (error.message) {
          toastMessage = error.message;
        } else {
          toastMessage = typeof error.errors.detail === 'undefined' ? error.errors : error.errors.detail;
        }
        this.router.navigate(['/user/deposits']);
        this.toastr.error(toastMessage);
      }
    );
  }
  onBack(): void {
    this.location.back();
  }
}
