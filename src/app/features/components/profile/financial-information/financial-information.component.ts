import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { first } from 'rxjs/operators';
import { removeSubscription } from 'src/app/helpers/unsubscribe';
import { APPCONFIG } from 'src/app/config';

@Component({
  selector: 'app-financial-information',
  templateUrl: './financial-information.component.html',
  styleUrls: ['financial-information.component.scss']
})
export class FinancialInformationComponent implements OnInit, OnDestroy {
  deposits: any;
  cardInfo: any;
  constructor(
    private profileService: ProfileService,
  ) {}
  subscribe: Subscription[] = [];
  ngOnInit() {
    this.getDeposits();
    this.getCardInfo();
  }

  getDeposits() {
    this.profileService
      .getDeposits()
      .pipe(first())
      .subscribe(
        response => {
          response.data.transactions.map(transaction => {
            if ( transaction.percentage_completion !== '100' ) {
              this.deposits = transaction;
            }
            return this.deposits;
          });
        },
        error => {
          this.deposits = {error: 'deposits couldn\'t be found'};
        }
      );
  }

  getCardInfo() {
    this.profileService.userProfile$.subscribe(response => {
      const profile = response.data.profile;
      if (Object.keys(profile.card_info.card_info).length === 0) {
        this.cardInfo = null;
      } else {
        const cardNumberFull = [...profile.card_info.card_info.card_number];
        this.cardInfo = {
          cardOwner : `${profile.user.first_name} ${profile.user.last_name}`,
          cardNumber: `${cardNumberFull[9]} ${cardNumberFull[10]} ${cardNumberFull[11]} ${cardNumberFull[12]}`,
          cardExpiry: profile.card_info.card_info.card_expiry,
        };
        this.getCardBrand(profile.card_info.card_info.card_brand);
      }
    });
  }

  getCardBrand(brand) {
    const cardUrls = {
      VISA: APPCONFIG.visa_card_url,
      'MASTER CARD': APPCONFIG.master_card_url,
      'AMERICAN EXPRESS': APPCONFIG.american_express_card,
      'PAY PAL': APPCONFIG.paypal_card
    };
    this.cardInfo.cardBrand = cardUrls[brand];
    return;
}

  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
