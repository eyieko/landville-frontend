import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PinValidateComponent } from './pin-validate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('PinValidateComponent', () => {
  let component: PinValidateComponent;
  let fixture: ComponentFixture<PinValidateComponent>;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockRoute = jasmine.createSpyObj(['snapshot']);
  const mockToastr = jasmine.createSpyObj(['success', 'error']);
  const mockSpinner = jasmine.createSpyObj(['show', 'hide']);
  const mockPaymentService = jasmine.createSpyObj(['initiatePinPay', 'validatePinPay']);
  const mockLocation = jasmine.createSpyObj(['back']);
  const mockTitleSvc = jasmine.createSpyObj(['setTitle']);
  const mockActivatedRoute = jasmine.createSpyObj(of({ data: { title: '' } }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinValidateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule,
        ToastrModule.forRoot(), NgxSpinnerModule, ReactiveFormsModule, FormsModule],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component = new PinValidateComponent(mockRoute, mockRouter,
      mockPaymentService, mockToastr, mockSpinner, mockLocation, mockTitleSvc, mockActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call validatePinPay method without error', () => {
    mockPaymentService.validatePinPay.and.returnValue(of(true));
    component.onSubmit();
    expect(mockPaymentService.validatePinPay).toHaveBeenCalled();
  }
  );
  it('should call the navigate method', () => {
    mockRouter.navigate.and.returnValue(of(true));
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns error.', () => {
    mockPaymentService.validatePinPay.and.returnValue(throwError({ status: 404, error: { message: 'somemessage' } }));
    component.onSubmit();
    expect(mockPaymentService.validatePinPay).toHaveBeenCalled();
  });
});
