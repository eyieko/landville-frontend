
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { of, throwError } from 'rxjs';
import {
    resetSpies,
    localStorageSpy,
    profileServiceSpy,
  } from 'src/app/helpers/tests/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {
    mockProfileResponse,
    mockDepositsResponse,
    mockProfileResponse3
  } from 'src/app/helpers/tests/mocks';
import { FinancialInformationComponent } from './financial-information.component';
import { configureTestSuite } from 'ng-bullet';

describe('Financial Information', () => {
      let component: FinancialInformationComponent;
      let fixture: ComponentFixture<FinancialInformationComponent>;
      let debug: DebugElement;
      let spy: any;

      beforeAll(() => resetSpies([profileServiceSpy]));
      configureTestSuite(() => {
          TestBed.configureTestingModule({
              imports: [
                BrowserModule,
                AppModule,
                HttpClientTestingModule,
                RouterTestingModule
              ],
              declarations: [],
              providers: [
                {
                    provide: LocalStorageService,
                    useValue: localStorageSpy
                },
                {
                    provide: ProfileService,
                    useValue: profileServiceSpy,
                }
              ]
          }).compileComponents();
      });

      beforeEach(() => {
          localStorage.clear();
          fixture = TestBed.createComponent(FinancialInformationComponent);
          component = fixture.componentInstance;
          debug = fixture.debugElement.query(By.css('form'));
          profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
          profileServiceSpy.getDeposits.and.returnValue(of(mockDepositsResponse));
          fixture.detectChanges();
      });
      afterEach(() => resetSpies([profileServiceSpy]));

      it('should create', () => {
          expect(component).toBeTruthy();
      });

      it('should retrieve the card information', () => {
          component.getCardInfo();
          expect(profileServiceSpy.getProfile).toHaveBeenCalled();
      });
      it('should retrieve the deposits', () => {
          component.getDeposits();
          expect(profileServiceSpy.getDeposits).toHaveBeenCalled();
      });
      it('should get the card brand', () => {
          component.getCardInfo();
          spy = spyOn(component, 'getCardBrand');
          component.getCardBrand(mockProfileResponse.data.profile.card_info.card_info.card_brand);
          expect(component.getCardBrand).toHaveBeenCalledWith(mockProfileResponse.data.profile.card_info.card_info.card_brand);
      });

      it('throw error', () => {
        profileServiceSpy.getDeposits.and.returnValue(throwError({status: 404}));
        component.getDeposits();
        expect(component.deposits).toEqual({error: 'deposits couldn\'t be found'});
      });

      it('throw error', () => {
        profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse3));
        component.getCardInfo();
        expect(component.cardInfo).toEqual(null);
      });
  });
