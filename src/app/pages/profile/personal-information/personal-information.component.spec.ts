import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PersonalInformationComponent } from './personal-information.component';
import { AppModule } from 'src/app/app.module';
import { mockProfileForm } from 'src/app/shared/utils/mocks/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, FormsModule, HttpClientTestingModule],
      declarations: [PersonalInformationComponent],
      providers: [ProfileService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Profile should only be submitted if the form is valid', () => {
    const service = TestBed.get(ProfileService);
    let spy: any = spyOn(service, 'saveProfile').and.returnValue(null);
    component.saveProfile({ value: mockProfileForm, valid: false });
    expect(component.saveProfile).toHaveBeenCalled();
  });
});
