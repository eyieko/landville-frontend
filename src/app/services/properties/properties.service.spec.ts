import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { httpClientSpy, resetSpies } from 'src/app/helpers/spies';

import { PropertiesService } from '../properties/properties.service';

describe('PropertiesService', () => {
  let httpMock: HttpTestingController;

  beforeAll(() => resetSpies([ httpClientSpy ]));
  afterAll(() => resetSpies([ httpClientSpy ]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    httpMock = TestBed.get(HttpTestingController);
    const service: PropertiesService = TestBed.get(PropertiesService);
  });

  it('should be created', () => {
    expect(this.service).toBeTruthy();
  });

  it('should send a GET method', () => {
    const mockUrl = 'http://127.0.0.1:8000/api/v1/properties/';
    this.service.getProperties(mockUrl).subscribe();
    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should test getting property', () => {
    const slug = 'hello';
    const responseObject = {
      success: true,
      message: 'successful'
    };
    httpClientSpy.get.and.returnValue(of(responseObject));
    this.service.getPropertyBySlug(slug).subscribe(res => {
      expect(res).toBe(responseObject);
    });
  });
});
