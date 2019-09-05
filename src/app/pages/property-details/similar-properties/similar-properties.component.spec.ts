import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {OwlCarousel} from 'ngx-owl-carousel';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {SimilarPropertiesComponent} from './similar-properties.component';
import {PropertyDetailsComponent} from '../property-details.component';
import {environment} from 'src/environments/environment';
import {ToastrService} from 'ngx-toastr';
import {toastServiceSpy} from '../../../helpers/spies';

describe('SimilarPropertiesComponent', () => {
  let component: SimilarPropertiesComponent;
  let fixture: ComponentFixture<SimilarPropertiesComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let mockReq;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimilarPropertiesComponent,
        PropertyDetailsComponent,
        OwlCarousel,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: '**', component: PropertyDetailsComponent }, ]),
        NgxSpinnerModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    component.propertyDetails = {
      title: 'Test property',
      state: 'Nairobi',
      price: '200',
      bedrooms: 3,
      bathrooms: 1
    };
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('change'));

    // search is made for state by default
    // propertyDetails.state for this test is set to Nairobi so search query will be ?state=Nairobi
    mockReq = httpMock.expectOne(`${environment.api_url}/properties/?state=Nairobi`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a header and a form', () => {
    const form = fixture.nativeElement.querySelector('form');
    const header = fixture.nativeElement.querySelector('h3');
    expect(form).toBeTruthy();
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('See other properties:');
  });

  it('should call getSimilarProperties when selected option changes', () => {
    const getSimilarPropertiesSpy = spyOn(component, 'getSimilarProperties').and.callThrough();
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('change'));
    expect(getSimilarPropertiesSpy).toHaveBeenCalled();
  });

  it('should make a http request when selected option changes', () => {
    const mockResponse = {
      data: {properties: {results: [{title: 'Similar property'}]}}
    };

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual('GET');

    mockReq.flush(mockResponse);
  });

  it('should show \'No similar properties\' if results array is empty', () => {
    const mockResponse = {
      data: {properties: {results: []}}
    };

    mockReq.flush(mockResponse);

    fixture.detectChanges();
    const noSimilarProperty = fixture.debugElement.query(By.css('#noSimilar')).nativeElement;
    expect(noSimilarProperty.textContent).toContain('No similar properties were found.');
  });

  it('should show toaster message in case of errors', () => {
    mockReq.error(new ErrorEvent('fail'));
    expect(toastServiceSpy.error).toHaveBeenCalled();
  });
});
