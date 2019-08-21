import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PropertyDetailsComponent } from 'src/app/pages/property-details/property-details.component';
import { PropertyDetailComponent } from 'src/app/pages/property-details/property-detail/property-detail.component';
import { PropertyDescriptionComponent } from 'src/app/pages/property-details/property-description/property-description.component';
import { ClientAdminComponent } from 'src/app/pages/property-details/client-admin/client-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import {
    resetSpies, propertyDetailSpy,
} from 'src/app/helpers/spies';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('Property detail', () => {
    let component: PropertyDetailsComponent;
    let fixture: ComponentFixture<PropertyDetailsComponent>;
    let responseObject = {
        data: {
            property: {
                id: 5,
                price: 30000000.0,
                lot_size: 30.99,
                image_others: [
                    "http://res.cloudinary.com/landville/image/upload/v1564747325/g8hioaz6f8bm3yi6qoxa.jpg",
                    "http://res.cloudinary.com/landville/image/upload/v1564747325/ghxhns8lvdvm9e3nn6bj.jpg",
                    "http://res.cloudinary.com/landville/image/upload/v1564747326/ozwzeofqpghbmo34klsh.jpg",
                    "http://res.cloudinary.com/landville/image/upload/v1564747327/uzcult2245klz6o1dlim.jpg"
                ],
                address: {
                    City: "kampala",
                    State: "Kireka",
                    Street: "Profla"
                },
                coordinates: {
                    "lat": 2345345345.4535,
                    "lon": 98978.09
                },
                created_at: "2019-08-02T12:04:38.060244Z",
                updated_at: "2019-08-07T12:06:05.530189Z",
                title: "2 Bedroomed Flat",
                property_type: "Empty Lot",
                description: "Lorem ipsum dolor sit amet",
                list_date: null,
                is_published: true,
                is_sold: false,
                sold_at: null,
                bedrooms: 2,
                bathrooms: 1,
                garages: 1,
                image_main: "http://res.cloudinary.com/landville/image/upload/v1564747324/svqgwpof3icaik4l2s4l.jpg",
                video: "http://res.cloudinary.com/landville/video/upload/v1564747475/xj8tralyvqxjejat8qjf.mp4",
                view_count: 190,
                last_viewed: "2019-08-07T12:06:05.529965Z",
                purchase_plan: "Installments",
                slug: "profla-kireka-flats",
                client: {
                    "client_name": "clients Company",
                    "phone": "+254 7002780187",
                    "email": "clients.company@andela.com",
                    "address": {
                        "City": "kampala",
                        "State": "kamwokya",
                        "Street": "mulago"
                    }
                }
            }
        }
    }

    let mockActivateRouteParam = {
        paramMap: of({ get: () => 'hello'})
    }

    beforeAll(() => resetSpies([propertyDetailSpy]));
    afterEach(() => resetSpies([propertyDetailSpy]));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PropertyDetailsComponent,
                PropertyDetailComponent,
                PropertyDescriptionComponent,
                ClientAdminComponent
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([{ path: '**', component: PropertyDetailsComponent },]),
                NgxSpinnerModule
            ],
            providers: [

                {
                    provide: PropertyDetailService,
                    useValue: propertyDetailSpy
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivateRouteParam
                }
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PropertyDetailsComponent);
        component = fixture.componentInstance;
        propertyDetailSpy.getProperty.and.returnValue(of(responseObject));
        fixture.detectChanges();
    });
       
    it ('should create' ,() =>{
      expect(component).toBeTruthy();
    });
         
    it('should call getProperties', () => {
      propertyDetailSpy.getProperty.and.returnValue(of(responseObject));
        spyOn(component, 'viewProperty');
        expect(propertyDetailSpy.getProperty).toHaveBeenCalled();
    });
});
