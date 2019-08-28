import { localStorageSpy } from './../helpers/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/http.service';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [{ provide: { LocalStorageService: { useValue: localStorageSpy } } }],
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
