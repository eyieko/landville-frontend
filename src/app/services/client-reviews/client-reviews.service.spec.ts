import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientReviewsService } from 'src/app/services/client-reviews/client-reviews.service';
import { httpClientSpy, reviewsSpy } from 'src/app/helpers/tests/spies';
import { environment } from 'src/environments/environment';

describe('ClientReviewsService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ClientReviewsService, useValue: reviewsSpy }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ClientReviewsService = TestBed.get(ClientReviewsService);
    expect(service).toBeTruthy();
  });

});
