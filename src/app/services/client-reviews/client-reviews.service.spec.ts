import { TestBed } from '@angular/core/testing';

import { ClientReviewsService } from './client-reviews.service';

describe('ClientReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientReviewsService = TestBed.get(ClientReviewsService);
    expect(service).toBeTruthy();
  });
});
