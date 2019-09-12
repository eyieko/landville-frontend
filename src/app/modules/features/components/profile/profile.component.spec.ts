import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AppModule } from 'src/app/app.module';
import { FeaturesModule } from 'src/app/modules/features/features.module';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {
  profileServiceSpy,
  toastServiceSpy,
  resetSpies
} from 'src/app/helpers/tests/spies';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import {
  mockDepositsResponse,
  mockProfileResponse
} from 'src/app/helpers/tests/mocks';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeAll(() => {
    resetSpies([profileServiceSpy, toastServiceSpy]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  });

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, FeaturesModule, RouterTestingModule],
      declarations: [],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        }
      ]
    })
      .compileComponents()
      .then(r => {});
  });

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    profileServiceSpy.getDeposits.and.returnValue(of(mockDepositsResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
