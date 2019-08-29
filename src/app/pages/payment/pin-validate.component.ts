import { PaymentService } from 'src/app/services/payment/payment-service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pin-validate',
  templateUrl: './pin-validate.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PinValidateComponent implements OnInit {
  flwRef: string;
  purpose: string;

  otp = new FormControl('', Validators.required);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private titleService: Title
    ) { this.titleService.setTitle('Pin Validate'); }

  ngOnInit() {
    this.flwRef = this.route.snapshot.paramMap.get('flwRef');
    this.purpose = this.route.snapshot.paramMap.get('purpose');
  }

  onBack(): void {
    this.location.back();
    }

  onSubmit(): void {
    const payload = {
      flwRef: this.flwRef,
      purpose: this.purpose,
      otp: this.otp.value
    };
    this.spinner.show();
    this.paymentService.validatePinPay(payload).subscribe(
      resp => {
        this.spinner.hide();
        this.router.navigate(['/home']);
        this.toastr.success(resp['message']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error['error']['message']);
      }
    );
  }
}
