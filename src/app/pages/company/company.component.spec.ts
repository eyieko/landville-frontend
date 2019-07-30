import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyComponent} from './company.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onSubmitCompanyDetails method', async(() => {
    const companyDetailForm = {
      value: {
        companyName: 'saf',
        phone: '0712345678',
        email: 'test@gmail.com',
        street: 'test',
        city: 'test',
        state: 'test',
      },
      invalid: false,
    } as NgForm;
    component.onSubmitCompanyDetails(companyDetailForm);
    expect(component.onSubmitCompanyDetails).toBeTruthy();
  }));
});
