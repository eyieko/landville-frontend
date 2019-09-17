import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientReviewService } from 'src/app/services/client-review.service';

describe('ClientReviewService', () => {
  let httpTestingController: HttpTestingController;
  let service: ClientReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientReviewService,
      ],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ClientReviewService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call createClientReview with the correct URL', () => {
    service.createClientReview(10, { review: 'Feedback' }).subscribe();
    const req = httpTestingController.expectOne(`${environment.api_url}/auth/10/reviews/`);
    req.flush({ message: 'success' });
  });
  it('should throw an unexpected error', () => {
    let response: any;
    let errResponse: any;
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    service.createClientReview(5000, { review: 'Feedback--' }).subscribe(res => response = res, err => errResponse = err);
    const req = httpTestingController.expectOne(`${environment.api_url}/auth/5000/reviews/`);
    req.flush({message: 'success'}, mockErrorResponse);
  });
});
