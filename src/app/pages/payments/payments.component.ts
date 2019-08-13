import { Component, OnInit, OnDestroy } from "@angular/core";
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
// import { Subscription } from "rxjs";

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

  constructor(
    private internationalPaymentService: InternationalPaymentService,
    private toastrService: ToastrService,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
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
      amount: [null, [Validators.required]],
      billingzip: [null, [Validators.required]],
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
    this.subscription[0].unsubscribe();
  }

  // validateCardNo(control: AbstractControl): {[key: string]: boolean} | null{
  //     if( typeof(control.value)
  //     return null;
  // }

  onSubmitPaymentDetails({ value }) {
    console.log(value);

    this.spinner.show();
    this.payload = {
      cardno: value.cardno,
      cvv: value.cvv,
      expirymonth: value.expirymonth,
      expiryyear: value.expiryyear,
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
        // .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.toastrService.success("Your Payment has been placed");
            this.router.navigateByUrl("https://www.google.com/");
          },
          error => {
            let errors = "";
            for (var key in error) {
              errors += `${key}: ${error[key]}`;
            }
            this.toastrService.error(errors);
            this.loading = false;
          }
        )
    );
  }
}
