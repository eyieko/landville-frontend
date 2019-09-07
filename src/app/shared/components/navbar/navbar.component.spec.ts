import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { resetSpies } from 'src/app/helpers/social.spies';
import { localStorageSpy, profileServiceSpy, routerSpy } from 'src/app/helpers/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { mockProfileResponse } from 'src/app/shared/mocks';


describe('NavbarComponent', () => {
  let component: NavbarComponent;

  let fixture: ComponentFixture<NavbarComponent>;

  beforeAll(() => {
      resetSpies([ profileServiceSpy ]);
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
