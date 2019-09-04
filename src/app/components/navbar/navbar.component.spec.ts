import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { localStorageSpy, profileServiceSpy, routerSpy } from 'src/app/helpers/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { resetSpies } from 'src/app/helpers/social.spies';
import { mockProfileResponse } from 'src/app/shared/mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('NavbarComponent', () => {
  let component: NavbarComponent;

  let fixture: ComponentFixture<NavbarComponent>;

  beforeAll(() => {
    resetSpies([profileServiceSpy]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  }

  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        NavbarComponent
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    localStorageSpy.get.and.returnValue('token');
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    const el = fixture.nativeElement.querySelector('#logoutBtn');
    el.dispatchEvent(new Event('click'));
    fixture.whenStable().then(() => {
      expect(component.handleLogout).toHaveBeenCalled();
    });
  });
});
