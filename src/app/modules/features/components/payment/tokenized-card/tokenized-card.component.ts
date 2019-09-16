import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SavedCard } from 'src/app/models/SavedCard';

@Component({
  templateUrl: './tokenized-card.component.html',
  styleUrls: ['../payment.component.scss']
})
export class TokenizedCardComponent implements OnInit {
  cardForm = new FormGroup({
    card: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    purpose: new FormControl('', Validators.required)
  });
  cards: SavedCard[] = [];


  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
    this.getSavedCards();
  }
  onSubmit(): void {
    const payload = {
      amount: this.cardForm.value.amount,
      purpose: this.cardForm.value.purpose
    };
    const cardId =   this.cardForm.value.card;
    this.spinner.show();
    this.paymentService.payWithTokenizedCard(payload, cardId).subscribe(
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

  getSavedCards(): void {
    this.paymentService.getSavedCard().subscribe(response => {
      this.cards = response.data.saved_cards;
    });
  }
}
