import { Component, OnInit } from '@angular/core';
import { TransactionInformationService } from 'src/app/services/profile/transaction-information/transaction-information.service';

@Component({
  selector: 'app-transaction-information',
  templateUrl: './transaction-information.component.html',
  styleUrls: ['./sass/transaction-information.component.scss']
})
export class TransactionInformationComponent implements OnInit {
  sucessTransactions: any[] = [];
  inProgressTransactions: any[] = [];
  results: any[] = [];
  constructor(private transactionService: TransactionInformationService) {}

  ngOnInit(): void {
    this.setTransacation();
  }
  setTransacation() {
    this.transactionService.getTransactions().subscribe(response => {
      this.results = response.data.transactions;
      for (const i in this.results) {
        if (this.results[i].price !== this.results[i].total_amount_paid) {
          this.inProgressTransactions.push(this.results[i]);
        } else {
          this.sucessTransactions.push(this.results[i]);
        }
      }
    });
  }
}
