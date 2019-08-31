import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientReviewsService } from './client-reviews.service';
import { httpClientSpy } from 'src/app/helpers/spies';

fdescribe('ClientReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HttpClient, useValue: httpClientSpy
      }
    ]
  }));

  it('should be created', () => {
    const service: ClientReviewsService = TestBed.get(ClientReviewsService);
    expect(service).toBeTruthy();
  });
});
