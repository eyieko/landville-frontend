import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSidebarComponent } from './profile-sidebar.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { AppModule } from 'src/app/app.module';

describe('ProfileSidebarComponent', () => {
  let component: ProfileSidebarComponent;
  let fixture: ComponentFixture<ProfileSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [ProfileSidebarComponent],
      providers: [LocalStorageService, ProfileService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
