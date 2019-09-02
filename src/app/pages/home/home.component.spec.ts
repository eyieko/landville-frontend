import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { PropertiesService } from 'src/app/services/properties/properties.service';
import {
  resetSpies,
  propertiesServiceSpy,
  toastServiceSpy
} from 'src/app/helpers/spies';
import { of, throwError } from 'rxjs';

const trendingProperties = {
  data: {
    property: []
  }
};
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeAll(() => resetSpies([propertiesServiceSpy]));
  afterEach(() => resetSpies([propertiesServiceSpy]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ComponentsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [HomeComponent],
      providers: [
        {
          provide: PropertiesService,
          useValue: propertiesServiceSpy
        },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    propertiesServiceSpy.getProperties.and.returnValue(of(trendingProperties));
    fixture.detectChanges();
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

});
