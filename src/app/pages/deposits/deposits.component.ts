import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Deposit } from 'src/app/models/Deposit';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepositsService } from 'src/app/services/deposits/deposits.service';
import { removeSubscription } from 'src/app/helpers/unsubscribe';


@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit, OnDestroy {
  subscribe: Subscription[] = [];
  headElements = ['Reference', 'Date', 'Amount'];
  transactions: Deposit[] = [];
  startDateVal = '';
  endDateVal = '';
  newResults: any[];

  constructor(
    private depositsService: DepositsService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  onFilter() {
    const filteredTransactions = [];
    this.transactions.filter(deposit => {
      const date = new Date(deposit.created_at);
      const fromDate = new Date(this.startDateVal);
      const toDate = new Date(this.endDateVal);

      if (fromDate && toDate) {
        if (date >= fromDate && date <= toDate) {
          filteredTransactions.push(deposit);
        }
      }
    });
    this.transactions = filteredTransactions;
    this.newResults = filteredTransactions;
  }

  clear() {
    this.newResults = null;
    this.setTransactions();
  }

  ngOnInit() {
    this.titleService.setTitle('My Deposits');
    this.metaService.addTags([]);
    this.setTransactions();
  }

  setTransactions() {
    this.spinner.show();
    this.subscribe.push(
      this.depositsService.getDeposits().subscribe(
        response => {
          this.transactions = response.results;
          this.spinner.hide();
        },
        error => {
          this.toastrService.error(
            error.errors || 'Something went wrong fetching your deposits'
          );
          this.spinner.hide();
        }
      )
    );
  }

  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
