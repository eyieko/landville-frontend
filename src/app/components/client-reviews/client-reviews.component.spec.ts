import { mockReviewsResponse, reviewResponse } from 'src/app/helpers/tests/mocks';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { httpClientSpy, toastServiceSpy, reviewsSpy, resetSpies } from 'src/app/helpers/tests/spies';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientReviewsComponent } from 'src/app/components/client-reviews/client-reviews.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { configureTestSuite } from 'ng-bullet';

describe('ClientReviewsComponent', () => {
  let component: ClientReviewsComponent;
  let fixture: ComponentFixture<ClientReviewsComponent>;
  let debugElement: DebugElement;
  const url = `${environment.api_url}/auth/1/reviews`;

  beforeAll(() => resetSpies([reviewsSpy]));
  afterEach(() => resetSpies([reviewsSpy]));

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ClientReviewsComponent],
      imports: [
        HttpClientModule,
        NgxSpinnerModule,
        RouterTestingModule.withRoutes([{ path: '**', component: ClientReviewsComponent }, ]),
      ],
      providers: [
        {
          provide: ClientReviewsService,
          useValue: reviewsSpy
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },

        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReviewsComponent);
    component = fixture.componentInstance;
    reviewsSpy.getReviews.and.returnValue(of(mockReviewsResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should go to next page on button click', () => {
    debugElement = fixture.debugElement.query(By.css('.next'));
    debugElement.triggerEventHandler('click', null);
    expect(reviewsSpy.getReviews).toHaveBeenCalled();
  });

  it('should go to previous page on button click', () => {
    debugElement = fixture.debugElement;
    debugElement.query(By.css('.prev')).triggerEventHandler('click', null);
    expect(reviewsSpy.getReviews).toHaveBeenCalled();
  });

  it('should set the components next property when reviews exist', () => {
    reviewsSpy.getReviews.and.returnValue(of(reviewResponse));
    component.fetchReviews(url);
    expect(component.next).toEqual(reviewResponse.next);
    expect(component.prev).toEqual(reviewResponse.previous);
  });
  it('should throw a toast error', () => {
    reviewsSpy.getReviews.and.returnValue(
      throwError({ errors: { details: 'No reviews yet' } })
    );
    component.fetchReviews(url);
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      'No reviews yet'
    );
  });
});
