import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError, of, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { ReviewComponent } from './review.component';

class RouterStub {
  navigate(params) {
  }
}
class ActivatedRouterStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }
  get params() {
    return this.subject.asObservable();
  }
}

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockToastr = jasmine.createSpyObj(['error']);
  const mockSpinner = jasmine.createSpyObj(['show', 'hide']);
  const mockreviewService = jasmine.createSpyObj(['createClientReview']);
  const mockactivatedRoute = jasmine.createSpyObj(['route']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [
        NgxSpinnerModule, ReactiveFormsModule, FormsModule,
        HttpClientTestingModule, ToastrModule.forRoot(), BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouterStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
  });

  it('should create review component successfully', () => {
    expect(component).toBeTruthy();
  });
  it('should be able to get client ID from URL', () => {
    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    route.push({ clientId: 1 });
    expect(route).toBeTruthy();
  });
  it('should have a review field', () => {
    expect(component.review).toBeTruthy();
  });
  it('should trigger onsubmit method', async(() => {
    component.submitReview();
    expect(component.submitReview).toBeTruthy();
  }));
  it(' should submit a  review without an error', () => {
    component = new ReviewComponent(mockreviewService, mockSpinner, mockToastr, mockRouter, mockactivatedRoute);
    mockreviewService.createClientReview.and.returnValue(of(true));
    component.submitReview();
    expect(mockreviewService.createClientReview).toHaveBeenCalled();
  });
  it('should toast error if ReviewComponent returns an error', () => {
    component = new ReviewComponent(mockreviewService, mockSpinner, mockToastr, mockRouter, mockactivatedRoute);
    mockreviewService.createClientReview.and.returnValue(throwError({ status: 404, message: 'client not found' }));
    component.submitReview();
    expect(mockToastr.error).toHaveBeenCalled();
  });
});
