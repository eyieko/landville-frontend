import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { localStorageSpy, profileServiceSpy, routerSpy } from 'src/app/helpers/tests/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { NavbarComponent } from 'src/app/modules/shared/components/navbar/navbar.component';
import { mockProfileResponse } from 'src/app/helpers/tests/mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { configureTestSuite } from 'ng-bullet';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  configureTestSuite(() => {
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
  });

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
