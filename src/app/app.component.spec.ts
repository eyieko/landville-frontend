import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import {configureTestSuite} from 'ng-bullet';
import {PropertiesComponent} from './components/properties/properties.component';
import {localStorageSpy, profileServiceSpy, propertiesServiceSpy} from './helpers/tests/spies';
import {of} from 'rxjs';
import {NavbarComponent} from './modules/shared/components/navbar/navbar.component';
import {FooterComponent} from './modules/shared/components/footer/footer.component';
import {TopbarComponent} from './modules/shared/components/topbar/topbar.component';
import {ProfileService} from './services/profile/profile.service';
import {LocalStorageService} from './services/local-storage.service';
import {HttpClient} from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        TopbarComponent,
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: HttpClient, },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
