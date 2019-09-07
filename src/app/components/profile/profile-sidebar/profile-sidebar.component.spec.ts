import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { localStorageSpy, profileServiceSpy, resetSpies, toastServiceSpy } from 'src/app/helpers/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { mockProfileForm, mockProfileResponse, mockProfileResponseNoAddress } from 'src/app/shared/mocks';
import { RoleTransformPipe } from 'src/app/shared/pipes/role.pipe';

import { ProfileSidebarComponent } from './profile-sidebar.component';

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;

  beforeAll(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  });
  afterEach(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, HttpClientTestingModule, NgxSpinnerModule ],
      declarations: [ ProfileSidebarComponent, RoleTransformPipe ],
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
    fixture = TestBed.createComponent(ProfileSidebarComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.addressSet).toBeTruthy();
  });
  it('should update the image', () => {
    const event = {
      target: {
        files: [ { name: 'image_file' } ]
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
        files: [ { name: 'aa' } ]
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

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;

  beforeAll(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
    profileServiceSpy.userProfile$ = of(mockProfileResponseNoAddress);
  });
  afterEach(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, HttpClientTestingModule, NgxSpinnerModule ],
      declarations: [ ProfileSidebarComponent, RoleTransformPipe ],
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
    fixture = TestBed.createComponent(ProfileSidebarComponent);
    component = fixture.componentInstance;
    profileServiceSpy.getProfile.and.returnValue(
      of(mockProfileResponseNoAddress)
    );
    fixture.detectChanges();
  });
  it('should set custom message if the user has not set their address', () => {
    profileServiceSpy.getProfile.and.returnValue(
      of(mockProfileResponseNoAddress)
    );
    profileServiceSpy.userProfile$ = of(mockProfileResponseNoAddress);
    component.fetchProfile();
    expect(component.addressSet).toBeFalsy();
  });
});
