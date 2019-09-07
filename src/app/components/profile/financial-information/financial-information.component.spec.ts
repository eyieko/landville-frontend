import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { of } from 'rxjs';

import { AppModule } from 'src/app/app.module';
import { profileServiceSpy, resetSpies, routerSpy, toastServiceSpy } from 'src/app/helpers/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';

import {
  mockDepositsResponse,
  mockProfileResponse,
  mockProfileResponse1,
  mockProfileResponse2,
  mockProfileResponse3
} from 'src/app/shared/mocks';

import { FinancialInformationComponent } from './financial-information.component';

describe('Financial Information Component', () => {
  let component: FinancialInformationComponent;
  let fixture: ComponentFixture<FinancialInformationComponent>;
  let debug: DebugElement;
  beforeAll(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppModule,
        HttpClientTestingModule,
        RoundProgressModule
      ],
      declarations: [ FinancialInformationComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ProfileService,
          useValue: profileServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(FinancialInformationComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css('form'));
    profileServiceSpy.getDeposits.and.returnValue(of(mockDepositsResponse));
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    fixture.detectChanges();
  });

  afterEach(() => resetSpies([ profileServiceSpy, toastServiceSpy ]));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return card information from profile of the user', () => {
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    component.getCardInfo();

    expect(profileServiceSpy.userProfile$).toBeDefined();
  });

  it('Should return Master card image for account using master card', () => {
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
    component.getCardInfo();

    expect(profileServiceSpy.userProfile$).toBeDefined();
  });

  it('Should return Visa card image for account using visa card', () => {
    profileServiceSpy.userProfile$ = of(mockProfileResponse1);
    component.getCardInfo();

    expect(profileServiceSpy.getDeposits).toBeDefined();
    expect(component.cardInfo).toBeDefined();
  });

  it('Should return MASTER card image for account using master card', () => {
    profileServiceSpy.userProfile$ = of(mockProfileResponse2);
    component.getCardInfo();

    expect(profileServiceSpy.getDeposits).toBeDefined();
    expect(component.cardInfo).toBeDefined();
  });

  it('Should return PAYPAL image for account using paypal', () => {
    profileServiceSpy.userProfile$ = of(mockProfileResponse3);
    component.getCardInfo();

    expect(profileServiceSpy.getDeposits).toBeDefined();
    expect(component.cardInfo).toBeDefined();
  });

  it('Should display savings ', () => {
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.current-savings h2')).nativeElement.textContent;
    expect(el).toEqual(` ${ mockDepositsResponse.data.transactions[0].total_amount_paid } `);
  });
});
