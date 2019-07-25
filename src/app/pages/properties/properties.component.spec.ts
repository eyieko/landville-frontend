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
        results: []
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

  it("test getProperties function", () => {
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

  it("test component next property ", () => {
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

  it("test component previous property ", () => {
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
    debugElement.query(By.css(".fa")).triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      expect(component.toggleView()).toHaveBeenCalled();
    });
  });
});
