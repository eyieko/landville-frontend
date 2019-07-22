import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AppModule } from 'src/app/app.module';
import { CommonLayoutComponent } from 'src/app/layouts/common-layout/common-layout.component';
import { CommonLayoutModule } from 'src/app/layouts/common-layout/common-layout.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CommonLayoutModule],
      declarations: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should be loading when it is initialized', () => {});
});
