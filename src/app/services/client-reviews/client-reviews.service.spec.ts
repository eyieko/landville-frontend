import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { environment } from 'src/environments/environment';

describe('ClientReviewsService', () => {
  let httpTestingController: HttpTestingController;
  let service: ClientReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientReviewsService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ClientReviewsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch reviews successfully', () => {
    service.getReviews(10).subscribe();
    const req = httpTestingController.expectOne(
      `${environment.api_url}/auth/10/reviews/`
    );
    req.flush({ message: 'success' });
  });
  
  it('should post reply successfully', () => {
    service.replyToReviews(10, { reply: 'Feedback' }).subscribe();
    const req = httpTestingController.expectOne(
      `${environment.api_url}/auth/10/reply/`
    );
    req.flush({ message: 'success' });
  });
});
