import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchService } from 'src/app/services/search/search.service';
import { environment } from 'src/environments/environment';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchComponent],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use search service', () => {
    const url = `${environment.api_url}/properties/?`;
    service.searchProperties(url);
    expect(service.searchProperties).toBeDefined();
  });
});
