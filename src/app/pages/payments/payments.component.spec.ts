import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentsComponent } from "./payments.component";
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { Location } from "@angular/common";

import {
  internationalPaymentServiceSpy,
  resetSpies,
  routerSpy,
  toastServiceSpy,
  locationSpy
} from "../../helpers/spies";
import { InternationalPaymentService } from "src/app/services/internationalPayment/international-payment.service";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe("PaymentsComponent", () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      declarations: [PaymentsComponent],
      providers: [
        { provide: ToastrService, useValue: toastServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: InternationalPaymentService,
          useValue: internationalPaymentServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should error if an invalid form is passed", () => {
    const cardno = component.form.controls.cardno;
    cardno.setValue("");
    expect(component.form.invalid).toBeTruthy();
  });

  it("should call submit", () => {
    const response = {
      message:
        "https://ravesandboxapi.flutterwave.com/mockvbvpage?ref=FLW-MOCK-f3e901600b6dc73df17f7056a4f782de&code=00&message=Approved. Successful&receiptno=RN1565337244749",
      txRef: "LANDVILLE-2019-08-09 07:54:01.760701"
    };

    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      of(response)
    );
    const de = fixture.debugElement.query(By.css("form"));
    de.triggerEventHandler("ngSubmit", response);
    expect(toastServiceSpy.success).toHaveBeenCalledWith(
      "Your Payment has been placed"
    );
  });

  it("should call submit and throw an error", () => {
    const responseError = {
      purpose: ["This field is required."]
    };

    const value = {
      amount: "44444"
    };
    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      throwError(responseError)
    );
    component.onSubmitPaymentDetails({
      value
    });
    expect(component.loading).toEqual(false);
  });

  it("should call backClicked Method", () => {
    component.backClicked();
    fixture.whenStable().then(() => {
      expect(component.backClicked).toHaveBeenCalled();
    });
  });
});
