import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyComponent} from './company.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {companyServiceSpy, resetSpies, routerSpy, toastServiceSpy} from '../../helpers/spies';
import {of} from 'rxjs';
import {CompanyService} from '../../services/company/company.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeAll(() => {
    resetSpies([companyServiceSpy, toastServiceSpy]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ToastrService, useValue: toastServiceSpy},
        {provide: CompanyService, useValue: companyServiceSpy},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    resetSpies([companyServiceSpy, toastServiceSpy]);
  });

  it('should create component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should get company details', () => {
    companyServiceSpy.getCompanyDetails.and.returnValue(of({message: 'success'}));
    component.loadClientCompany();

    expect(companyServiceSpy.getCompanyDetails$).toBeTruthy();
  });

  it('should be able to get value field in company form if empty', () => {
    const controls = component.f;
    expect(controls.email).toEqual('');
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
    companyServiceSpy.createCompany.and.returnValue(of({message: 'success'}));
    companyServiceSpy.getCompanyDetails.and.returnValue(of({message: 'success'}));
    component.onSubmitCompanyDetails(companyDetailForm);
    expect(toastServiceSpy.success).toHaveBeenCalledWith('Company registered successfully.');
    expect(toastServiceSpy.error).toHaveBeenCalledWith('Company registered successfully.');
  }));

  it('should error if an invalid form passed', () => {
    const email = component.companyDetailForm.controls.email;
    email.setValue('');
    expect(component.companyDetailForm.invalid).toBeTruthy();
  });

});
