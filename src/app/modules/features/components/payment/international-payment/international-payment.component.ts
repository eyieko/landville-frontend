import { Component, OnInit, OnDestroy, ViewChild, ElementRef, } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { removeSubscription } from 'src/app/helpers/unsubscribe';
import { PaymentService } from 'src/app/services/payment/payment-service';

@Component({
  selector: 'app-payments',
  templateUrl: './international-payment.component.html',
  styleUrls: ['./international-payment.component.scss']
})
export class InternationalPaymentComponent implements OnInit, OnDestroy {
  loading: boolean;
  payload: any;
  form: FormGroup;
  subscription: Subscription[] = [];
  iframeSrc: SafeUrl;
  shouldHide = true;
  expectedMonths: any = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];
  propertyId: any;

  expectedYears: any;

  constructor(
    private internationalPaymentService: PaymentService,
    private location: Location,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,
  ) { }

  generateYears() {
    const thisYear = new Date().getFullYear();
    this.expectedYears = Array.from(Array(14).keys()).map((item) => item + thisYear);
  }


  ngOnInit() {

    this.generateYears();
    this.form = this.fb.group({
      cardNo: [
        null,
        [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
          Validators.minLength(8)
        ]
      ],
      cvv: [
        null,
        [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
          Validators.maxLength(4),
          Validators.minLength(3)
        ]
      ],
      expiryMonth: [
        null,
        [Validators.required, Validators.max(12), Validators.min(1)]
      ],
      expiryYear: [null, [Validators.required, Validators.min(19)]],
      amount: [
        null,
        [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]
      ],
      billingZip: [null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
      billingCity: [null, [Validators.required]],
      billingAddress: [null, [Validators.required]],
      billingState: [null, [Validators.required]],
      billingCountry: [null, [Validators.required]],
      saveCard: false,
      purpose: [null, [Validators.required]],
    });
  }

  ngOnDestroy() {
    removeSubscription(this.subscription);
  }


  backClicked() {
    this.location.back();
  }

  onSubmitPaymentDetails({ value }) {

    this.loading = true;
    this.spinner.show();
    this.payload = {
      cardno: value.cardNo,
      cvv: value.cvv,
      expirymonth: value.expiryMonth,
      expiryyear: value.expiryYear.slice(-2),
      amount: value.amount,
      billingzip: value.billingZip,
      billingcity: value.billingCity,
      billingaddress: value.billingAddress,
      billingstate: value.billingState,
      billingcountry: value.billingCountry,
      save_card: value.saveCard,
      purpose: value.purpose,
    };

    if (this.propertyId) {
      this.payload.property_id = this.propertyId;
    }

    this.subscription.push(
      this.internationalPaymentService
        .createInternationalPayment(this.payload)
        .subscribe(
          data => {
            this.spinner.hide();
            this.loading = false;
            this.toastrService.success('Your transaction has been initiated. '
              + 'Please ensure to enter the OTP sent to your phone');
            this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data.message + '&output=embed');
            this.shouldHide = false;
          },
          error => {
            this.spinner.hide();
            this.loading = false;
            let errors = '';

            Object.keys(error).map((key) => {
              const msg = String(error[key]);
              errors += `${key}: ${msg}\n`;
            });
            this.toastrService.error(errors);
          }
        )
    );

  }

  resubmit() {
    this.shouldHide = true;
  }
}
