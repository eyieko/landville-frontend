import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentsComponent } from "./payments.component";
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import {
  internationalPaymentServiceSpy,
  resetSpies,
  routerSpy,
  toastServiceSpy
} from "../../helpers/spies";

describe("PaymentsComponent", () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [PaymentsComponent],
      providers: [{ provide: ToastrService, useValue: toastServiceSpy }]
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
    const email = component.form.controls.cardno;
    email.setValue("");
    expect(component.form.invalid).toBeTruthy();
  });

  
  it("should trigger onSubmitPaymentDetails method with invalid form", async(() => {
    const form = {
      value: {},
      invalid: true
    } as NgForm;
    component.onSubmitPaymentDetails(form);
    expect(component.form.invalid).toBeTruthy();
  }));
});
