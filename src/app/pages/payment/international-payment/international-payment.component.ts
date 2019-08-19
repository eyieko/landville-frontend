import { Component, OnInit, OnDestroy } from '@angular/core';
import { InternationalPaymentService } from '../../../services/payment/international-payment.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { removeSubscription } from 'src/app/helpers/unsubscribe';

@Component({
  selector: 'app-payments',
  templateUrl: './international-payment.component.html',
  styleUrls: ['./international-payment.component.scss']
})
export class InternationalPaymentComponent implements OnInit, OnDestroy {
  loading: boolean;
  payload: any;
  form: FormGroup;
  formData;
  subscription: Subscription[] = [];
  currentUrl: SafeUrl;
  iframeSrc: SafeUrl;
  shouldHide = true;
  expectedMonths: any = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];

  expectedYears: any;

  constructor(
    private internationalPaymentService: InternationalPaymentService,
    private toastrService: ToastrService,
    private location: Location,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer

  ) { }

  generateYears() {
    const thisYear = new Date().getFullYear();
    this.expectedYears = Array.apply(0, Array(14))
      .map((element, index) => index + thisYear);
  }
  ngOnInit() {

    this.generateYears();
    this.form = this.fb.group({
      cardno: [
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
      expirymonth: [
        null,
        [Validators.required, Validators.max(12), Validators.min(1)]
      ],
      expiryyear: [null, [Validators.required, Validators.min(19)]],
      amount: [
        null,
        [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]
      ],
      billingzip: [null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
      billingcity: [null, [Validators.required]],
      billingaddress: [null, [Validators.required]],
      billingstate: [null, [Validators.required]],
      billingcountry: [null, [Validators.required]],
      savecard: false,
      purpose: [null, [Validators.required]]
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
      cardno: value.cardno,
      cvv: value.cvv,
      expirymonth: value.expirymonth,
      expiryyear: value.expiryyear.slice(-2),
      amount: value.amount,
      billingzip: value.billingzip,
      billingcity: value.billingcity,
      billingaddress: value.billingaddress,
      billingstate: value.billingstate,
      billingcountry: value.billingcountry,
      save_card: value.savecard,
      purpose: value.purpose
    };


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
            for (const key in error) {
              const msg = String(error[key]);
              errors += `${key}: ${msg}`;
            }
            this.toastrService.error(errors);
          }
        )
    );

  }
}
