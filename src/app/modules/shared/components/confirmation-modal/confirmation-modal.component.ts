import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment-service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  isModalClosed = false;
  slug: string;
  message: string;
  @Output() closeModalOutput = new EventEmitter<boolean>();

  constructor(
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {

  }
  closeModal() {
    this.isModalClosed = this.paymentService.displayModalService();
    this.closeModalOutput.emit(this.isModalClosed);
  }

  delete() {
    console.log('Delete is clicked ......');
  }
}
