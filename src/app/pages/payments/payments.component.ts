import { Component, OnInit } from "@angular/core";
import { InternationalPaymentService } from "../../services/internationalPayment/international-payment.service";
import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";

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

  constructor(
    private internationalPaymentService: InternationalPaymentService,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      cardno: [""],
      cvv: [""],
      expirymonth: [""],
      expiryyear: [""],
      amount: [""],
      billingzip: [""],
      billingcity: [""],
      billingaddress: [""],
      billingstate: [""],
      billingcountry: [""],
      save_card: [""],
      purpose: [""]
    });
  }

  onSubmitPaymentDetails({ value }) {
    // this.formData = this.form.value;
    console.log(value);

    this.loading = true;
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
    this.internationalPaymentService
      .createInternationalPayment(this.payload)
      // .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.toastrService.success("Your Payment has been placed");
          // this.router.navigate(["/"]);
        },
        error => {
          this.toastrService.error(JSON.stringify(error.errors));
          this.loading = false;
        }
      );
  }
}
