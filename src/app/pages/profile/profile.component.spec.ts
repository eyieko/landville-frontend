import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AppModule } from 'src/app/app.module';
import { CommonLayoutModule } from 'src/app/layouts/common-layout/common-layout.module';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import {
  profileServiceSpy,
  toastServiceSpy
} from 'src/app/shared/utils/helpers/spies';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockProfileResponse } from 'src/app/shared/utils/mocks/mocks';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CommonLayoutModule],
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    expect(component).toBeTruthy();
  });
  // it('should be loading when it is initialized', () => {});
});
