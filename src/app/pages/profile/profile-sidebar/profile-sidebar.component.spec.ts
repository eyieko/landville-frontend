import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileSidebarComponent } from './profile-sidebar.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { AppModule } from 'src/app/app.module';
import {
  profileServiceSpy,
  resetSpies,
  toastServiceSpy
} from 'src/app/shared/utils/helpers/spies';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import {
  mockProfileResponse,
  mockProfileResponseNoAddress,
  mockProfileFormErrorResponse,
  mockProfileForm
} from 'src/app/shared/utils/mocks/mocks';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;

  beforeAll(() => resetSpies([profileServiceSpy, toastServiceSpy]));
  afterEach(() => resetSpies([profileServiceSpy, toastServiceSpy]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [ProfileSidebarComponent],
      providers: [
        LocalStorageService,
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
    fixture = TestBed.createComponent(ProfileSidebarComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    // profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    expect(component).toBeTruthy();
  });
  it('should load user image and information when the component mounts', () => {
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    component.fetchProfile();
    expect(profileServiceSpy.getProfile).toHaveBeenCalled();
  });
  it('should set custom message if the user has not set their profile', () => {
    profileServiceSpy.getProfile.and.returnValue(
      of(mockProfileResponseNoAddress)
    );
    component.fetchProfile();
    expect(profileServiceSpy.getProfile).toHaveBeenCalled();
    expect(component.addressSet).toBeTruthy();
  });
  it('should update the image', () => {
    const event = {
      target: {
        files: [{ name: 'image_file' }]
      }
    };
    profileServiceSpy.updateProfile.and.returnValue(of(mockProfileResponse));
    const buttonDE = fixture.debugElement.query(By.css('.image-input'));
    buttonDE.triggerEventHandler('change', event);
    fixture.detectChanges();
    expect(profileServiceSpy.updateProfile).toHaveBeenCalled();
  });
  it('should throw error if image is invalid', async(() => {
    const event = {
      target: {
        files: [{ name: 'aa' }]
      }
    };
    const profileForm = mockProfileForm as NgForm;
    profileServiceSpy.updateProfile.and.returnValue(
      throwError({
        error: {
          errors: {
            image: 'Please provide a valid image format'
          }
        }
      })
    );
    component.updateImage(event);
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      'Could not update your profile image. Please provide a valid image format'
    );
  }));
});
