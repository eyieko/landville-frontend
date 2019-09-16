import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-transaction',
  templateUrl: './empty-transaction.component.html',
  styleUrls: ['../sass/transaction-information.component.scss']
})
export class EmptyTransactionComponent implements OnInit {
  @Input() message: string;
  constructor() {}

  ngOnInit() {}
}
