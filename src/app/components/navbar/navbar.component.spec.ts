import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { APPCONFIG } from 'src/app/config';
import { localStorageSpy, profileServiceSpy } from 'src/app/helpers/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let inputEl: HTMLElement;

  const response = {
    data: {
      profile: {
        image: 'image',
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        NavbarComponent,
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    inputEl = fixture.nativeElement.querySelector('dropdownToggle');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clickout elements', () => {
    const event = new Event('click');
    component.clickout(event);
    expect(component.dropDownActive).toBeFalsy();
  });

  it('should handle Dropdown Display', () => {
    component.handleDropdownDisplay();
    expect(component.dropDownActive).toBeTruthy();
  });
  it('should get company details', () => {
    profileServiceSpy.pushProfile();
    const req = httpMock.expectOne(
      `${ APPCONFIG.base_url }/auth/profile/`
    );
    profileServiceSpy.userProfile$.and.returnValue(of(response));
    component.profileDetails();

    expect(profileServiceSpy.userProfile$).toBeTruthy();
  });
  // it('should assign firstName when route is resolved', () => {
  //   profileServiceSpy.userProfile$.and.returnValue(of(response));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.profileImage).toEqual('image');
  //   });
  // });
  // it('should assign firstName when route is resolved', () => {
  //   profileServiceSpy.userProfile$.and.returnValue(of(response));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.profileImage).toEqual('image');
  //   });
  // });
});
