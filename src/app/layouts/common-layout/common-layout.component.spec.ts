import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { localStorageSpy, profileServiceSpy } from 'src/app/helpers/spies';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { CommonLayoutComponent } from './common-layout.component';


describe('CommonLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        CommonLayoutComponent,
        NavbarComponent,
        FooterComponent,
        TopbarComponent,
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceSpy
        },
        {provide: LocalStorageService, useValue: localStorageSpy},
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CommonLayoutComponent);
    const commonLayoutComponent = fixture.debugElement.componentInstance;
    expect(commonLayoutComponent).toBeTruthy();
  });
});

