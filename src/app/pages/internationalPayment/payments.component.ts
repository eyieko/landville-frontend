import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
import { InternationalPaymentService } from "../../services/internationalPayment/international-payment.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { removeSubscription } from 'src/app/helpers/unsubscribe';

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  loading: boolean;
  payload: any;
  form: FormGroup;
  formData;
  subscription: Subscription[] = [];
  currentUrl: SafeUrl;
  iframeSrc: SafeUrl;
  shouldHide: boolean = true;
  expectedMonths: any = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
  ]

  expectedYears: any;

  constructor(
    private internationalPaymentService: InternationalPaymentService,
    private toastrService: ToastrService,
    private _location: Location,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer

  ) { }

  generateYears() {
    let thisYear = new Date().getFullYear();
    this.expectedYears = Array.apply(0, Array(14))
      .map((_element, index) => index + thisYear);
  }
  ngOnInit() {

    this.generateYears();
    this.form = this.fb.group({
      cardno: [
        null,
        [
          Validators.required,
          Validators.pattern("^[1-9]+[0-9]*$"),
          Validators.minLength(8)
        ]
      ],
      cvv: [
        null,
        [
          Validators.required,
          Validators.pattern("^[1-9]+[0-9]*$"),
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
        [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]
      ],
      billingzip: [null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]],
      billingcity: [null, [Validators.required]],
      billingaddress: [null, [Validators.required]],
      billingstate: [null, [Validators.required]],
      billingcountry: [null, [Validators.required]],
      save_card: false,
      purpose: [null, [Validators.required]]
    });
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    removeSubscription(this.subscription);
  }


  onSubmitPaymentDetails({ value }) {
    console.log(value);

    this.loading = true
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
      save_card: value.save_card,
      purpose: value.purpose
    };


    this.subscription.push(
      this.internationalPaymentService
        .createInternationalPayment(this.payload)
        .subscribe(
          data => {
            this.spinner.hide();
            this.loading = false
            this.toastrService.success("Your transaction has been initiated. "
              + "Please ensure to enter the OTP sent to your phone");
            this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data.message + '&output=embed');

            console.log(this.iframeSrc);

            this.shouldHide = false;
          },
          error => {
            this.spinner.hide();
            this.loading = false

            let errors = "";
            for (var key in error) {
              let msg = String(error[key])
              errors += `${key}: ${msg}`;
            }
            this.toastrService.error(errors);
          }
        )
    );

  }
}
