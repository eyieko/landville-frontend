import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewsComponent } from './reviews.component';
import { httpClientSpy, reviewsSpy } from 'src/app/helpers/spies';

fdescribe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsComponent],
      imports: [HttpClientTestingModule],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
