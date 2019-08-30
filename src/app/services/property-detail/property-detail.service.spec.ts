import { environment } from 'src/environments/environment';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { httpClientSpy, resetSpies } from 'src/app/helpers/tests/spies';

describe('PropertyDetailService', () => {
  // const httpMock: HttpTestingController;
  let propertyDetailService: PropertyDetailService;
  beforeAll(() => resetSpies([httpClientSpy]));
  afterAll(() => resetSpies([httpClientSpy]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LocalStorageService,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    propertyDetailService = TestBed.get(PropertyDetailService);
  });

  it('should be created', () => {
    propertyDetailService = TestBed.get(PropertyDetailService);
    expect(propertyDetailService).toBeTruthy();
  });

  it('should test getting property', () => {
    const slug = 'hello';
    const responseObject = {
      success: true,
      message: 'successful'
    };
    httpClientSpy.get.and.returnValue(of(responseObject));
    propertyDetailService.getProperty(slug).subscribe(res => {
      expect(res).toBe(responseObject);
    });
  });
  it('Should test the method displayService', () => {
    const service: PropertyDetailService = TestBed.get(PropertyDetailService);
    service.displayModalService();
    expect(service.isDisplayedModal).toBe(true);
  });
  it('Should test the delete property service', () => {
    const slug = 'hello';
    const responseObject = {
      message: 'successfully deleted'
    };
    httpClientSpy.delete.and.returnValue(of(responseObject));
    propertyDetailService.deletePropertyService(slug).subscribe(res => {
      expect(res).toBe(responseObject);
    });
  });
});
