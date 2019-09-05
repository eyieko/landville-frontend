import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AppModule } from 'src/app/app.module';
import { FeaturesModule } from 'src/app/features/features.module';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {
  profileServiceSpy,
  toastServiceSpy,
  resetSpies
} from 'src/app/helpers/tests/spies';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockProfileResponse } from 'src/app/helpers/tests/mocks';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeAll(() => {
    resetSpies([profileServiceSpy, toastServiceSpy]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, FeaturesModule],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
