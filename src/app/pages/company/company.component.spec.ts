import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CompanyComponent} from 'src/app/pages/company/company.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {companyServiceSpy, resetSpies, routerSpy, toastServiceSpy} from 'src/app/helpers/spies';
import {of, throwError} from 'rxjs';
import {CompanyService} from 'src/app/services/company/company.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Meta, Title} from '@angular/platform-browser';

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
        Title,
        Meta,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    companyServiceSpy.getCompanyDetails.and.returnValue(of({message: 'success'}));
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

    expect(companyServiceSpy.getCompanyDetails).toBeTruthy();
  });

  it('should be able to get value field in company form if empty', () => {
    const controls = component.f;
    expect(controls.email.value).toEqual('');
  });

  it('should trigger onSubmitCompanyDetails method to be successfull', async(() => {
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
    component.onSubmitCompanyDetails(companyDetailForm);
    expect(toastServiceSpy.success).toHaveBeenCalledWith('Company registered successfully.');
  }));

  it('should trigger onSubmitCompanyDetails method to fail', async(() => {
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
    companyServiceSpy.createCompany.and.returnValue(throwError({errors: {details: 'success'}}));
    component.onSubmitCompanyDetails(companyDetailForm);
    expect(toastServiceSpy.error).toHaveBeenCalledWith('{"details":"success"}');
  }));

  it('should trigger onSubmitCompanyDetails method with invalid form', async(() => {
    const companyDetailForm = {
      value: {},
      invalid: true,
    } as NgForm;
    component.onSubmitCompanyDetails(companyDetailForm);
    expect(component.companyDetailForm.invalid).toBeTruthy();
  }));

  it('should error if an invalid form passed', () => {
    const email = component.companyDetailForm.controls.email;
    email.setValue('');
    expect(component.companyDetailForm.invalid).toBeTruthy();
  });

});
