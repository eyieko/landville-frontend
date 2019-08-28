import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { profileServiceSpy } from 'src/app/helpers/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { TopbarComponent } from 'src/app/shared/components/topbar/topbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

import { CommonLayoutComponent } from './common-layout.component';


describe('CommonLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
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
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CommonLayoutComponent);
    const commonLayoutComponent = fixture.debugElement.componentInstance;
    expect(commonLayoutComponent).toBeTruthy();
  });
});

