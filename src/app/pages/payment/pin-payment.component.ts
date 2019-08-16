import { validateInput } from './../../validators/payment-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment-service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pin-payment',
  templateUrl: './pin-payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PinPaymentComponent implements OnInit {
	validYears: number[];
	validMonths: string[] = [
		'01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
	]
	cardForm = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
		securityNumber: new FormControl('', Validators.required),
		cardExpiry: new FormGroup({
			expiryMonth: new FormControl(
				'MM', [Validators.required, validateInput('MM')]
				),
			expiryYear: new FormControl(
				'YYYY', [Validators.required, validateInput('YYYY')]
				)
		}),
		amount: new FormControl('', [Validators.required, Validators.min(0)]),
		pin: new FormControl('', Validators.required),
		purpose: new FormControl('', Validators.required),
		saveCard: new FormControl(false)
  });

  constructor(
		private paymentService: PaymentService, 
		private router: Router,
		private spinner: NgxSpinnerService,
		private toastr: ToastrService,
		private location: Location,
		private titleService: Title
		) {this.titleService.setTitle("Card & Pin Deposit"); }

  ngOnInit(): void {
		this.generateValidYears();
	}

	generateValidYears(){
		let yearList: number[] = [];
		const now = new Date();
		const currentYear = now.getFullYear();
		const lastYear = currentYear + 10;
		for(let i = currentYear; i <= lastYear; i++){
			yearList.push(i);
		}
		this.validYears = yearList;
	}

	submitDetails() {
		const payload = {
			'cardno': this.cardForm.value['cardNumber'],
			'cvv': this.cardForm.value['securityNumber'],
			'expirymonth': this.cardForm.value['cardExpiry']['expiryMonth'],
			'expiryyear': this.cardForm.value['cardExpiry']['expiryYear'].slice(-2),
			'amount': this.cardForm.value['amount'],
			'pin': this.cardForm.value['pin'],
			'purpose': this.cardForm.value['purpose'],
			'save_card': this.cardForm.value['saveCard']
		}
		this.spinner.show()
		this.paymentService.initiatePinPay(payload).subscribe(
			resp => {
				this.spinner.hide()
				this.router.navigate(['/validate-pin', resp['flwRef'], 
				this.cardForm.value['purpose']])
			},
			error => {
				this.spinner.hide()
				let toastMessage = '';
				if (error.message){
				toastMessage = error.message
				} else{
					toastMessage = typeof error.errors.detail == 'undefined' ? error.errors : error.errors.detail
				}
				this.toastr.error(toastMessage)
			}
		)
	}
	isInvalid(controlName:string){
		const ctrl = this.cardForm.controls[controlName]?
		this.cardForm.controls[controlName] : 
		this.cardForm.controls['cardExpiry'].get(controlName)
		return {'is-invalid':  (ctrl.dirty || ctrl.touched) &&  ctrl.invalid}
	}
	onBack():void {
	this.location.back();
	}
}
