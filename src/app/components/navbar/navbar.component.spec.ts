import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { localStorageSpy, profileServiceSpy } from 'src/app/helpers/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

import { NavbarComponent } from './navbar.component';
import { resetSpies } from 'src/app/helpers/social.spies';
import { mockProfileResponse } from 'src/app/shared/mocks';
import { of } from 'rxjs';

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
	beforeAll(() => {
		resetSpies([profileServiceSpy])
		profileServiceSpy.userProfile$ = of(mockProfileResponse)
	}

	)
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
