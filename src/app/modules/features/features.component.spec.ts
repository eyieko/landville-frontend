import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopbarComponent } from 'src/app/modules/shared/components/topbar/topbar.component';
import { localStorageSpy, profileServiceSpy } from 'src/app/helpers/tests/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

import { FeaturesComponent } from './features.component';


describe('CommonLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        FeaturesComponent,
        NavbarComponent,
        FooterComponent,
        TopbarComponent,
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceSpy
        },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(FeaturesComponent);
    const commonLayoutComponent = fixture.debugElement.componentInstance;
    expect(commonLayoutComponent).toBeTruthy();
  });
});

