import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { first } from 'rxjs/operators';
import { removeSubscription } from 'src/app/helpers/unsubscribe';
import { SavedCard } from 'src/app/models/SavedCard';
import { PaymentService } from 'src/app/services/payment/payment-service';

@Component({
  selector: 'app-financial-information',
  templateUrl: './financial-information.component.html',
  styleUrls: ['financial-information.component.scss']
})
export class FinancialInformationComponent implements OnInit, OnDestroy {
  deposits: any;
  cards: SavedCard[] = [];
  displayedModal = false;
  constructor(
    private profileService: ProfileService,
    private paymentService: PaymentService
  ) { }
  subscribe: Subscription[] = [];

  ngOnInit() {
    this.getDeposits();
    this.getSavedCards();
  }

  getDeposits() {
    this.profileService
      .getDeposits()
      .pipe(first())
      .subscribe(
        response => {
          response.data.transactions.map(transaction => {
            if (transaction.percentage_completion !== '100') {
              this.deposits = transaction;
            }
            return this.deposits;
          });
        },
        error => {
          this.deposits = { error: 'deposits couldn\'t be found' };
        }
      );
  }

  getSavedCards(): void {
    this.paymentService.getSavedCard().subscribe(response => {
      this.cards = response.data.saved_cards;
    });
  }

  displayModal() {
    console.log('Display model clicked !');
    this.displayedModal = this.paymentService.displayModalService();
  }
  closeModal($event) {
    this.displayedModal = $event;
  }

  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
