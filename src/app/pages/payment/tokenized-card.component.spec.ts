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

describe('TokenizedCardComponent', () => {
  let component: TokenizedCardComponent;
	let fixture: ComponentFixture<TokenizedCardComponent>;
	let mockRouter = jasmine.createSpyObj(['navigate']);
	let mockToastr = jasmine.createSpyObj(['error', 'success']);
	let mockSpinner = jasmine.createSpyObj(['show', 'hide']);
	let mockPaymentService = jasmine.createSpyObj(['payWithTokenizedCard']);
	let mockLocation = jasmine.createSpyObj(['back']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ TokenizedCardComponent ],
			imports: [ HttpClientTestingModule, RouterTestingModule, 
				BrowserAnimationsModule, CommonModule, ToastrModule.forRoot(), 
				NgxSpinnerModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenizedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});
	it('should call payWithTokenizedCard method without error', () => {
		component = new TokenizedCardComponent(mockPaymentService, mockRouter, 
			mockSpinner, mockToastr, mockLocation);
		mockPaymentService.payWithTokenizedCard.and.returnValue(of(true))
		component.onSubmit();
		expect(mockPaymentService.payWithTokenizedCard).toHaveBeenCalled();
	}
	);
	it('should call the navigate method', () => {
		component = new TokenizedCardComponent(mockPaymentService, mockRouter, 
			mockSpinner,  mockToastr, mockLocation);
		mockRouter.navigate.and.returnValue(of(true))
		component.onBack();
		expect(mockRouter.navigate).toHaveBeenCalled();
	}
	);
	it('should toast error if PaymentService returns error', () => {
		component = new TokenizedCardComponent(mockPaymentService, mockRouter, 
			mockSpinner, mockToastr, mockLocation);
		mockPaymentService.payWithTokenizedCard.and.returnValue(throwError({status: 404, errors:{detail: undefined}}))
		component.onSubmit();
		expect(mockPaymentService.payWithTokenizedCard).toHaveBeenCalled();
		expect(mockToastr.error).toHaveBeenCalled();
	});
	it('should toast error if PaymentService returns error for expired token', () => {
		component = new TokenizedCardComponent(mockPaymentService, mockRouter, 
			mockSpinner, mockToastr, mockLocation);
		mockPaymentService.payWithTokenizedCard.and.returnValue(throwError({status: 404, errors:{detail: 'somemessage'}}))
		component.onSubmit();
		expect(mockToastr.error).toHaveBeenCalled();
	}
	);
});
