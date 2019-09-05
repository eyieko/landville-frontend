import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenizedCardComponent } from './tokenized-card.component';
import { routerSpy } from 'src/app/helpers/tests/spies';

describe('TokenizedCardComponent', () => {
  let component: TokenizedCardComponent;
  let fixture: ComponentFixture<TokenizedCardComponent>;
  const mockToastr = jasmine.createSpyObj(['error', 'success']);
  const mockSpinner = jasmine.createSpyObj(['show', 'hide']);
  const mockPaymentService = jasmine.createSpyObj(['payWithTokenizedCard']);
  const mockLocation = jasmine.createSpyObj(['back']);
  const mockActivatedRoute = jasmine.createSpyObj(of({ data: { title: '' } }));
  const mockTitle = jasmine.createSpyObj(['setTitle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TokenizedCardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,
        BrowserAnimationsModule, CommonModule, ToastrModule.forRoot(),
        NgxSpinnerModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = new TokenizedCardComponent(mockPaymentService, routerSpy,
      mockSpinner, mockToastr, mockLocation, mockActivatedRoute, mockTitle);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call payWithTokenizedCard method without error', () => {
    mockPaymentService.payWithTokenizedCard.and.returnValue(of(true));
    component.onSubmit();
    expect(mockPaymentService.payWithTokenizedCard).toHaveBeenCalled();
  }
  );
  it('should call the navigate method', () => {
    routerSpy.navigate.and.returnValue(of(true));
    component.onBack();
    expect(routerSpy.navigate).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns error', () => {
    mockPaymentService.payWithTokenizedCard.and.returnValue(throwError({ status: 404, errors: { detail: undefined } }));
    component.onSubmit();
    expect(mockPaymentService.payWithTokenizedCard).toHaveBeenCalled();
    expect(mockToastr.error).toHaveBeenCalled();
  });
  it('should toast error if PaymentService returns error for expired token', () => {
    mockPaymentService.payWithTokenizedCard.and.returnValue(throwError({ status: 404, errors: { detail: 'somemessage' } }));
    component.onSubmit();
    expect(mockToastr.error).toHaveBeenCalled();
  }
  );
  it('should toast error if PaymentService returns card error', () => {
    mockPaymentService.payWithTokenizedCard.and.returnValue(throwError({ status: 404, message: 'somemessage' }));
    component.onSubmit();
    expect(mockToastr.error).toHaveBeenCalled();
  }
  );
});
