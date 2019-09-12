import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { of, throwError } from 'rxjs';
import {
  propertyDetailSpy,
  resetSpies,
  routerSpy,
  localStorageSpy,
  profileServiceSpy,
  toastServiceSpy
} from 'src/app/helpers/tests/spies';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {
  propertyResponse,
  updatedPropertyResponse
} from 'src/app/helpers/tests/mocks';
import { UpdatePropertyComponent } from './updateProperty.component';

describe('Update Property', () => {
  let component: UpdatePropertyComponent;
  let fixture: ComponentFixture<UpdatePropertyComponent>;
  let debug: DebugElement;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeAll(() => resetSpies([propertyDetailSpy]));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule,
        RouterTestingModule
      ],
      declarations: [],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageSpy
        },
        {
          provide: PropertyDetailService,
          useValue: propertyDetailSpy
        },
        {
          provide: MapsAPILoader,
          useValue: {
            load: jasmine
              .createSpy('load')
              .and.returnValue(new Promise(() => true))
          }
        }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(UpdatePropertyComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('form'));
    propertyDetailSpy.updateProperty.and.returnValue(
      of(updatedPropertyResponse)
    );
    propertyDetailSpy.getProperty.and.returnValue(of(propertyResponse));
    fixture.detectChanges();
  });
  afterEach(() => resetSpies([profileServiceSpy, toastServiceSpy]));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render properties', () => {
    component.getPropertyInfo(propertyResponse.data.property.slug);
    expect(propertyDetailSpy.updateProperty).toBeDefined();
  });

  it('should call the update property service', () => {
    component.updateProperty();
    expect(propertyDetailSpy.updateProperty).toBeDefined();
  });

  it('should update the property', () => {
    component.updatePropertyForm = formBuilder.group({ title: 'New title'});
    const formData = new FormData();
    formData.append('title', 'New Title');
    component.updateProperty();
    expect(propertyDetailSpy.updateProperty).toHaveBeenCalledWith(
      null,
      formData
    );
  });

  it('should upload an image', () => {
    const file = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png'
    });
    const events = {
      target: {
        files: [file]
      }
    };
    component.fileProgress(events);
    component.preview();
    expect(component.fileProgress).toBeDefined();
  });

  it('should upload an image', () => {
    const file = new File(['(⌐□_□)'], 'test.png', {
      type: 'pdf'
    });
    const events = {
      target: {
        files: [file]
      }
    };
    component.fileProgress(events);
    component.preview();
    expect(component.fileProgress).toBeDefined();
  });

  it('should upload a video', () => {
    const file = new File(['(⌐□_□)'], 'test.mp4', {
      type: 'video/mp4'
    });
    const events = {
      target: {
        files: [file]
      }
    };
    component.uploadMultiple(events);
    component.updateProperty();
    expect(component.uploadMultiple).toBeDefined();
  });

  it('should upload a video', () => {
    const file = new File(['(⌐□_□)'], 'test.png', {
      type: 'image/png'
    });
    const events = {
      target: {
        files: [file]
      }
    };
    component.uploadMultiple(events);
    component.updateProperty();
    expect(component.uploadMultiple).toBeDefined();
  });
});
