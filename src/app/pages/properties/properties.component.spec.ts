import { AppModule } from "./../../app.module";
import { PropertiesService } from "../../shared/services/properties/properties.service";
import { resetSpies, propertiesServiceSpy } from "./../../helpers/spies";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { PropertiesComponent } from "../properties/properties.component";
import { HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("PropertiesComponent", () => {
  let component: PropertiesComponent;
  let fixture: ComponentFixture<PropertiesComponent>;
  let debugElement: DebugElement;
  const url = "http://127.0.0.1:8000/api/v1/properties/";

  const Mockresponse = {
    data: {
      properties: {
        count: 1,
        next: "",
        previous: "",
        results: [
          {
            id: 3,
            price: 10000000.0,
            lot_size: 99.99,
            image_others: [
              "http://res.cloudinary.com/landville/image/upload/v1564567653/au4vtztnpklnmerfsq3m.png",
              "http://res.cloudinary.com/landville/image/upload/v1564567654/qp9hubcjzdfscrmguaxw.jpg"
            ],
            address: {
              City: "kampala",
              State: "Kololo",
              Street: "Brooklyn"
            },
            coordinates: {
              lat: 2345345345.4535,
              lon: 98978.09
            },
            created_at: "2019-07-31T10:09:56.235176Z",
            updated_at: "2019-07-31T10:10:37.174246Z",
            title: "Kololo Flats",
            property_type: "Empty Lot",
            description: "Exquisite flats in the world",
            list_date: null,
            is_published: false,
            is_sold: false,
            sold_at: null,
            bedrooms: null,
            bathrooms: null,
            garages: null,
            image_main:
              "http://res.cloudinary.com/landville/image/upload/v1564567652/ncaviduqbwfrvqmiunsf.png",
            video:
              "http://res.cloudinary.com/landville/video/upload/v1564567795/xket6aopnbbjjpscxb0i.mp4",
            view_count: 1,
            last_viewed: "2019-07-31T10:10:37.174094Z",
            purchase_plan: "Installments",
            slug: "brooklyn-kololo-flats",
            client: {
              client_name: "clients Company",
              phone: "+254 7002780187",
              email: "clients.company@andela.com",
              address: {
                City: "kampala",
                State: "kamwokya",
                Street: "mulago"
              }
            }
          }
        ]
      }
    }
  };

  beforeAll(() => resetSpies([propertiesServiceSpy]));
  afterEach(() => resetSpies([propertiesServiceSpy]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesComponent],
      imports: [AppModule, HttpClientModule],
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
    propertiesServiceSpy.getProperties.and.returnValue(of(Mockresponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should call getProperties function", () => {
    const url = "http://api/v1/properties";
    const response = {
      data: {
        properties: {
          count: 1,
          next: "",
          previous: "",
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.properties).toEqual(response.data.properties.results);
  });

  it("should use component next property ", () => {
    const url = "http://127.0.0.1:8000/api/v1/properties/";
    const response = {
      data: {
        properties: {
          count: 1,
          next: "http://127.0.0.1:8000/api/v1/properties/?limit=10&offset=10",
          previous: "",
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.next).toEqual(response.data.properties.next);
  });

  it("should use component previous property ", () => {
    const response = {
      data: {
        properties: {
          count: 1,
          next: "",
          previous:
            "http://127.0.0.1:8000/api/v1/properties/?limit=10&offset=10",
          results: []
        }
      }
    };

    propertiesServiceSpy.getProperties.and.returnValue(of(response));
    component.setProperties(url);
    expect(component.previous).toEqual(response.data.properties.previous);
  });

  it("should go to next page on button click", () => {
    debugElement = fixture.debugElement;
    debugElement.query(By.css(".next")).triggerEventHandler("click", null);
    expect(propertiesServiceSpy.getProperties).toHaveBeenCalled();
  });

  it("should go to previous page on button click", () => {
    debugElement = fixture.debugElement;
    debugElement.query(By.css(".prev")).triggerEventHandler("click", null);
    expect(propertiesServiceSpy.getProperties).toHaveBeenCalled();
  });

  it("should toggle view on button click", () => {
    debugElement = fixture.debugElement;
    spyOn(component, "toggleView");
    debugElement.query(By.css(".fas")).triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      expect(component.toggleView()).toHaveBeenCalled();
    });
  });
});
