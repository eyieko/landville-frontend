import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileSidebarComponent } from './profile-sidebar.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { AppModule } from 'src/app/app.module';
import {
  profileServiceSpy,
  resetSpies,
  toastServiceSpy,
  localStorageSpy
} from 'src/app/shared/utils/helpers/spies';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import {
  mockProfileResponse,
  mockProfileResponseNoAddress,
  mockProfileForm
} from 'src/app/shared/utils/mocks/mocks';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;

  beforeAll(() => resetSpies([profileServiceSpy, toastServiceSpy]));
  afterEach(() => {
    resetSpies([profileServiceSpy, toastServiceSpy]);
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule, NgxSpinnerModule],
      declarations: [ProfileSidebarComponent],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageSpy
        },
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
    expect(component).toBeTruthy();
  });
  it('should load user image and information when the component mounts', () => {
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    component.fetchProfile();
    expect(profileServiceSpy.getProfile).toHaveBeenCalled();
  });
  it('should set custom message if the user has not set their address', () => {
    profileServiceSpy.getProfile.and.returnValue(
      of(mockProfileResponseNoAddress)
    );
    component.fetchProfile();
    expect(profileServiceSpy.getProfile).toHaveBeenCalled();
    expect(component.addressSet).toBeFalsy();
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
  it('should store image in localStorage if the user has an image', () => {
    component.setImage(mockProfileResponse.data.profile);
    expect(localStorage.getItem('profileImage')).toEqual(
      mockProfileResponse.data.profile.image
    );
  });
  it('should first check the localStorage to get the profile image', () => {
    localStorageSpy.get.and.returnValue('https:dummyimage.com/300');
    component.setImage(mockProfileResponse.data.profile);
    expect(localStorage.getItem('profileImage')).toBe(
      mockProfileResponse.data.profile.image
    );
  });
  it('should generate random image for users who have no profile image', () => {
    profileServiceSpy.getProfile.and.returnValue(
      of(mockProfileResponseNoAddress)
    );
    localStorage.clear();
    spyOn(component, 'generateRandomAvatar');
    expect(component.generateRandomAvatar).toHaveBeenCalledTimes(0);
  });
});
