import { TestBed } from '@angular/core/testing';
import { TermsService } from './terms.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
describe('TermsService', () => {
  let service: TermsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []

    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('get Terms', () => {

    it('should call getTerms with the correct URL', () => {
      const url = environment.api_url + '/terms/';
      service.getTerms().subscribe();
      const req = httpTestingController.expectOne(url);
      req.flush({ details: 'hello', last_updated_at: '10102019' });
      httpTestingController.verify()
    }
    );
  });
});
