import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PinPaymentComponent } from './pin-payment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routerSpy } from 'src/app/helpers/tests/spies';


describe('PinPaymentComponent', () => {
  let component: PinPaymentComponent;
  let fixture: ComponentFixture<PinPaymentComponent>;
  const mockToastr = jasmine.createSpyObj(['error']);
  const mockSpinner = jasmine.createSpyObj(['show', 'hide']);
  const mockPaymentService = jasmine.createSpyObj(['initiatePinPay', 'validatePinPay']);
  const mockLocation = jasmine.createSpyObj(['back']);
  const mockTitleSvc = jasmine.createSpyObj(['setTitle']);
  const mockActivatedRoute = jasmine.createSpyObj(of({ data: { title: '' } }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinPaymentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,
        BrowserAnimationsModule, CommonModule, ToastrModule.forRoot(),
        NgxSpinnerModule, ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component = new PinPaymentComponent(mockPaymentService, routerSpy,
      mockSpinner, mockToastr, mockLocation, mockTitleSvc, mockActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call initiatePinPay method without error', () => {
    mockPaymentService.initiatePinPay.and.returnValue(of(true));
    component.submitDetails();
    expect(mockPaymentService.initiatePinPay).toHaveBeenCalled();
  });
  it('should call the navigate method', () => {
    routerSpy.navigate.and.returnValue(of(true));
    component.onBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
  it('should toast error if PaymentService returns error', () => {
    mockPaymentService.initiatePinPay.and.returnValue(throwError({ status: 404, errors: { detail: undefined } }));
    component.submitDetails();
    expect(mockPaymentService.initiatePinPay).toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalled();
  });
  it('should toast error if PaymentService returns error for expired token', () => {
    mockPaymentService.initiatePinPay.and.returnValue(throwError({ status: 404, errors: { detail: 'somemessage' } }));
    component.submitDetails();
    expect(mockToastr.error).toHaveBeenCalled();
  });
  it('should toast error if PaymentService returns card error', () => {
    mockPaymentService.initiatePinPay.and.returnValue(throwError({ status: 404, message: 'somemessage' }));
    component.submitDetails();
    expect(mockToastr.error).toHaveBeenCalled();
  });
  it('should toast serialization errors', () => {
    mockPaymentService.initiatePinPay.and.returnValue(throwError({ status: 404, cvv: ['somemessage'] }));
    component.submitDetails();
    expect(mockToastr.error).toHaveBeenCalled();
  });
});
