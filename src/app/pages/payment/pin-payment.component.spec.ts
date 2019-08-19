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


describe('PinPaymentComponent', () => {
  let component: PinPaymentComponent;
  let fixture: ComponentFixture<PinPaymentComponent>;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockToastr = jasmine.createSpyObj(['error']);
  const mockSpinner = jasmine.createSpyObj(['show', 'hide']);
  const mockPaymentService = jasmine.createSpyObj(['initiatePinPay', 'validatePinPay']);
  const mockLocation = jasmine.createSpyObj(['back']);
  const mockTitleSvc = jasmine.createSpyObj(['setTitle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinPaymentComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule,
        BrowserAnimationsModule, CommonModule, ToastrModule.forRoot(),
        NgxSpinnerModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call initiatePinPay method without error', () => {
    component = new PinPaymentComponent(mockPaymentService, mockRouter,
      mockSpinner, mockToastr, mockLocation, mockTitleSvc);
    mockPaymentService.initiatePinPay.and.returnValue(of(true));
    component.submitDetails();
    expect(mockPaymentService.initiatePinPay).toHaveBeenCalled();
  }
  );
  it('should call the navigate method', () => {
    component = new PinPaymentComponent(mockPaymentService, mockRouter,
      mockSpinner,  mockToastr, mockLocation, mockTitleSvc);
    mockRouter.navigate.and.returnValue(of(true));
    component.onBack();
    expect(mockLocation.back).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns error', () => {
    component = new PinPaymentComponent(mockPaymentService, mockRouter,
      mockSpinner, mockToastr, mockLocation, mockTitleSvc);
    mockPaymentService.initiatePinPay.and.returnValue(throwError({status: 404, errors: {detail: undefined}}));
    component.submitDetails();
    expect(mockPaymentService.initiatePinPay).toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns error for expired token', () => {
    component = new PinPaymentComponent(mockPaymentService, mockRouter,
      mockSpinner, mockToastr, mockLocation, mockTitleSvc);
    mockPaymentService.initiatePinPay.and.returnValue(throwError({status: 404, errors: {detail: 'somemessage'}}));
    component.submitDetails();
    expect(mockToastr.error).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns card error', () => {
    component = new PinPaymentComponent(mockPaymentService, mockRouter,
      mockSpinner, mockToastr, mockLocation, mockTitleSvc);
    mockPaymentService.initiatePinPay.and.returnValue(throwError({status: 404, message: 'somemessage'}));
    component.submitDetails();
    expect(mockToastr.error).toHaveBeenCalled();
  }
  );
});
