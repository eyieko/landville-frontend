import { environment } from 'src/environments/environment.prod';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { AppModule } from 'src/app/app.module';
import { resetSpies, propertiesServiceSpy } from 'src/app/helpers/tests/spies';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PropertiesComponent } from 'src/app/features/components/properties/properties.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('PropertiesComponent', () => {
  let component: PropertiesComponent;
  let fixture: ComponentFixture<PropertiesComponent>;
  let debugElement: DebugElement;
  const url = `${environment.api_url}/properties`;

  const Mockresponse = {
    data: {
      properties: {
        count: 1,
        next: '',
        previous: '',
        results: []
      }
    }
  };

  beforeAll(() => resetSpies([propertiesServiceSpy]));
  afterEach(() => resetSpies([propertiesServiceSpy]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesComponent, CardComponent],
      imports: [
        AppModule,
        HttpClientModule,
        NgxSpinnerModule,
        AuthenticationModule,
        RouterModule
      ],
      providers: [
        {
          provide: PropertiesService,
          useValue: propertiesServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesComponent);
    component = fixture.componentInstance;
    propertiesServiceSpy.getProperties.and.returnValue(of(Mockresponse));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProperties function', () => {
    const url = 'http://api/v1/properties';
    const response = {
      data: {
        properties: {
          count: 1,
          next: '',
          previous: '',
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.properties).toEqual(response.data.properties.results);
  });

  it('should use component next property ', () => {
    const url = 'http://127.0.0.1:8000/api/v1/properties/';
    const response = {
      data: {
        properties: {
          count: 1,
          next: '',
          previous: '',
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.next).toEqual(response.data.properties.next);
  });

  it('should use component next property ', () => {
    const url = 'http://127.0.0.1:8000/api/v1/properties/';
    const response = {
      data: {
        properties: {
          count: 1,
          next: '',
          previous: '',
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.next).toEqual(response.data.properties.next);
  });

  it('should set the components next property when properties exist', () => {
    const url = 'http://127.0.0.1:8000/api/v1/properties/';
    const response = {
      data: {
        properties: {
          count: 1,
          next: 'http://127.0.0.1:8000/api/v1/properties/limit?=10',
          previous: 'http://127.0.0.1:8000/api/v1/properties/limit?=10',
          results: [
            {
              id: 46,
              price: 1000000.0,
              lot_size: 99.0,
              image_others: [],
              address: {
                City: 'Gulu',
                State: 'Kumi',
                Street: 'Mumbai'
              },
              coordinates: {
                lat: 2345345.4535,
                lon: 5878.09
              },
              created_at: '2019-08-06T15:32:56.178294Z',
              updated_at: '2019-08-06T15:32:56.178424Z',
              title: 'Kumi hostel',
              property_type: 'Building',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate mi sit amet mauris commodo. Diam sollicitudin tempor id eu nisl nunc. Vel quam elementum pulvinar etiam. Velit ut tortor pretium viverra. Vitae turpis massa sed elementum tempus egestas sed. Ipsum a arcu cursus vitae. Integer quis auctor elit sed vulputate mi. Porta non pulvinar neque laoreet suspendisse interdum. Elementum sagittis vitae et leo duis ut diam. Urna molestie at elementum eu facilisis sed. Non curabitur gravida arcu ac. Id consectetur purus ut faucibus pulvinar elementum integer.',
              list_date: null,
              is_published: false,
              is_sold: false,
              sold_at: null,
              bedrooms: 3,
              bathrooms: 1,
              garages: null,
              image_main:
                'http://res.cloudinary.com/landville/image/upload/v1565105575/lrmfrjblnm8p2d0dac48.jpg',
              video: null,
              view_count: 0,
              last_viewed: null,
              purchase_plan: 'Installments',
              slug: 'mumbai-kumi-hostel',
              client: {
                client_name: 'client Company 2',
                phone: '+254 7002785197',
                email: 'client_company_2@gmail.com',
                address: {
                  City: 'city633',
                  State: 'state',
                  Street: 'street'
                }
              }
            }
          ]
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.next).toEqual(response.data.properties.next);
    expect(component.previous).toEqual(response.data.properties.previous);
  });

  it('should set the disabledNext and disabledPrevious to true', () => {
    const url = 'http://127.0.0.1:8000/api/v1/properties/';
    const response = {
      data: {
        properties: {
          count: 1,
          next: '',
          previous: '',
          results: [
            {
              id: 46,
              price: 1000000.0,
              lot_size: 99.0,
              image_others: [],
              address: {
                City: 'Gulu',
                State: 'Kumi',
                Street: 'Mumbai'
              },
              coordinates: {
                lat: 2345345.4535,
                lon: 5878.09
              },
              created_at: '2019-08-06T15:32:56.178294Z',
              updated_at: '2019-08-06T15:32:56.178424Z',
              title: 'Kumi hostel',
              property_type: 'Building',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate mi sit amet mauris commodo. Diam sollicitudin tempor id eu nisl nunc. Vel quam elementum pulvinar etiam. Velit ut tortor pretium viverra. Vitae turpis massa sed elementum tempus egestas sed. Ipsum a arcu cursus vitae. Integer quis auctor elit sed vulputate mi. Porta non pulvinar neque laoreet suspendisse interdum. Elementum sagittis vitae et leo duis ut diam. Urna molestie at elementum eu facilisis sed. Non curabitur gravida arcu ac. Id consectetur purus ut faucibus pulvinar elementum integer.',
              list_date: null,
              is_published: false,
              is_sold: false,
              sold_at: null,
              bedrooms: 3,
              bathrooms: 1,
              garages: null,
              image_main:
                'http://res.cloudinary.com/landville/image/upload/v1565105575/lrmfrjblnm8p2d0dac48.jpg',
              video: null,
              view_count: 0,
              last_viewed: null,
              purchase_plan: 'Installments',
              slug: 'mumbai-kumi-hostel',
              client: {
                client_name: 'client Company 2',
                phone: '+254 7002785197',
                email: 'client_company_2@gmail.com',
                address: {
                  City: 'city633',
                  State: 'state',
                  Street: 'street'
                }
              }
            }
          ]
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.disabledNext).toBeTruthy();
    expect(component.disabledPrevious).toBeTruthy();
  });

  it('should go to next page on button click', () => {
    debugElement = fixture.debugElement;
    debugElement.query(By.css('.next')).triggerEventHandler('click', null);
    expect(propertiesServiceSpy.getProperties).toHaveBeenCalled();
  });

  it('should go to previous page on button click', () => {
    debugElement = fixture.debugElement;
    debugElement.query(By.css('.prev')).triggerEventHandler('click', null);
    expect(propertiesServiceSpy.getProperties).toHaveBeenCalled();
  });

  it('should toggle view on button click', () => {
    debugElement = fixture.debugElement;
    spyOn(component, 'toggleView');
    debugElement.query(By.css('.fas')).triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(component.toggleView()).toHaveBeenCalled();
    });
  });
});
