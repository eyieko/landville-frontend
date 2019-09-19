import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { AddPropertyComponent } from './add-property.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { toastServiceSpy, PropertyServiceSpy } from 'src/app/helpers/tests/spies';
import { resetSpies } from 'src/app/helpers/tests/social.spies';
import { of } from 'rxjs';
import { Component } from 'react';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;
  /* let debugElement: DebugElement; */

  beforeAll(() => resetSpies([toastServiceSpy, PropertyServiceSpy]));
  afterAll(() => resetSpies([toastServiceSpy, PropertyServiceSpy]));

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: 'PropertyService', useValue: 'PropertyServiceSpy' },
        { provide: 'toastService', useValue: 'toastServiceSpy'},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form empty returns invalid', () => {
    expect(component.addPropertyForm.valid).toBeFalsy();
  });

  it('test upload methods', () => {
    const event = {
      target: {
        files: ['file 1', 'file 2']
      }
    };
    component.manyImages = ['']
    component.onFileSelect(event);
    component.onVideoSelect(event);
    component.uploadMaximumFive(event);
  });

  it('should successfully add a new property ', () => {
    const value = {
      title: "title",
      description: "description",
      price: 32,
      lot_size: 34,
      property_type: "B",
      purchase_plan: "I",
      state: "New york",
      street: "4th Street" ,
      city: "Kamapla",
      latitude: 234.45,
      longitude: 34.55,
      image_main: null,
      image_others: undefined,
      video: undefined,
      bedrooms: 4,
      bathrooms: 4,
      garages: 1
    }


    component.addNewProperty(value);
  });
});
