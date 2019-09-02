import { RouterTestingModule } from '@angular/router/testing';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReviewsComponent } from 'src/app/components/property-details/reviews/reviews.component';
import { httpClientSpy, reviewsSpy, resetSpies } from 'src/app/helpers/tests/spies';
import { of } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { mockReviewsResponse } from 'src/app/helpers/tests/mocks';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;
  beforeAll(() => resetSpies([reviewsSpy]));
  afterEach(() => resetSpies([reviewsSpy]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsComponent],
        imports: [HttpClientModule, NgxSpinnerModule,
            RouterTestingModule.withRoutes([{ path: '**', component: ReviewsComponent }, ])
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },
        {
          provide: ClientReviewsService,
          useValue: reviewsSpy
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    reviewsSpy.getReviews.and.returnValue(of(mockReviewsResponse));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to next page on button click', () => {
    const debugElement = fixture.nativeElement.querySelector('#review-btn');
    debugElement.dispatchEvent(new Event('click'));
    fixture.whenStable().then(() => {
    expect(component.getMoreReviews).toHaveBeenCalled();
  });
  });
});
