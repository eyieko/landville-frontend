
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { DepositsComponent } from 'src/app/pages/deposits/deposits.component';
import { DepositsService } from 'src/app/services/deposits/deposits.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { resetSpies } from 'src/app/helpers/social.spies';
import { DepositsSpy, toastServiceSpy, routerSpy } from 'src/app/helpers/spies';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

describe('DepositsComponent', () => {
  let component: DepositsComponent;
  let fixture: ComponentFixture<DepositsComponent>;
  let debugElement: DebugElement;

  const Mockresponse = {
    count: 1,
    next: '',
    previous: '',
    results: [
      {
        references: {
          txRef: 'LANDVILLE-2019-08-19 11:39:11.621507',
          orderRef: 'URF_1566214755403_1203335',
          flwRef: 'FLW-MOCK-############',
          raveRef: 'RV3HDS39499H4G4FHFIHIWIF'
        },
        amount: '8800.00',
        createdAt: '2019-08-19T11:57:19.722175Z',
        savingAccount: {
          balance: '18800.00'
        },
        transaction: null
      },
      {
        references: {
          txRef: 'LANDVILLE-2019-11-19 11:39:11.621507',
          orderRef: 'URF_1566214755403_1203335',
          flwRef: 'FLW-MOCK-ef0b7a9fb34f1a645dabcb75c59453a1',
          raveRef: 'RV31566214754034EACD2840E1'
        },
        amount: '1000.00',
        createdAt: '2019-11-19T11:57:19.722175Z',
        savingAccount: {
          balance: '11000.00'
        },
        transaction: null
      }
    ]
  };

  beforeAll(() => resetSpies([DepositsSpy, toastServiceSpy]));
  afterEach(() => resetSpies([DepositsSpy, toastServiceSpy]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositsComponent],
      imports: [
        HttpClientModule,
        NgxSpinnerModule,
        FormsModule,
        RouterTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {
          provide: DepositsService,
          useValue: DepositsSpy
        },
        { provide: ToastrService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositsComponent);
    component = fixture.componentInstance;
    DepositsSpy.getDeposits.and.returnValue(of(Mockresponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the clear function when the clear button is clicked', () => {
    debugElement = fixture.debugElement;
    spyOn(component, 'clear').and.callThrough();
    debugElement.query(By.css('.clear-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.clear).toHaveBeenCalled();
  });

  it('should call onFilter function when date filter button is clicked', () => {
    debugElement = fixture.debugElement;
    spyOn(component, 'onFilter').and.callThrough();
    debugElement
      .query(By.css('.filter-btn'))
      .triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onFilter).toHaveBeenCalled();
  });

  it('should throw a toast error when error occurs', () => {
    DepositsSpy.getDeposits.and.returnValue(
      throwError({ errors: { details: 'error' } })
    );
    component.setTransactions();
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      Object({ details: 'error' })
    );
  });
});
