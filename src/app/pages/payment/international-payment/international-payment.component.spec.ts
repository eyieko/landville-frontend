import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InternationalPaymentComponent } from './international-payment.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';

import {
  internationalPaymentServiceSpy,
  routerSpy,
  toastServiceSpy,
  locationSpy
} from 'src/app/helpers/spies';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentService } from 'src/app/services/payment/payment-service';

describe('InternationalPaymentComponent', () => {
  let component: InternationalPaymentComponent;
  let fixture: ComponentFixture<InternationalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, NgxSpinnerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [InternationalPaymentComponent],
      providers: [
        { provide: ToastrService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: PaymentService,
          useValue: internationalPaymentServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error if an invalid form is passed', () => {
    const cardNo = component.form.controls.cardNo;
    cardNo.setValue('');
    expect(component.form.invalid).toBeTruthy();
  });

  it('should call submit', () => {
    const response = {
      message:
        'random-rave-link',
      txRef: 'reference-id'
    };

    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      of(response)
    );
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', response);
    expect(component.loading).toEqual(true);
  });

  it('should call submit and throw an error', () => {
    const responseError = {
      purpose: ['This field is required.']
    };

    const value = {
      amount: '44444',
      expiryYear: '2022'
    };
    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      throwError(responseError)
    );
    component.onSubmitPaymentDetails({
      value
    });
    expect(component.loading).toEqual(false);
  });

  it('should call submit and successfully create payment', () => {
    const response = {
      message: 'https://random.com',
      txRef: 'receiptno'
    };

    const value = {
      cardNo: '5399838383838381',
      cvv: '470',
      expiryMonth: '01',
      expiryYear: '21',
      amount: '20',
      billingZip: '07205',
      billingCity: 'billingcity',
      billingAddress: 'billingaddress',
      billingState: 'NJ',
      billingCountry: 'UK',
      saveCard: true,
      purpose: 'Saving'

    };
    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      of(response)
    );
    component.onSubmitPaymentDetails({
      value
    });
    expect(component.loading).toEqual(false);
  });


  it('should call backClicked Method', () => {
    const el = fixture.nativeElement.querySelector('#backButton');
    el.dispatchEvent(new Event('click'));
    component.backClicked();
    fixture.whenStable().then(() => {
      expect(component.backClicked).toHaveBeenCalled();
    });
  });
});
