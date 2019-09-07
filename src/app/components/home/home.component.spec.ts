import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { HomeComponent } from 'src/app/components/home/home.component';
import { propertiesServiceSpy, resetSpies, toastServiceSpy } from 'src/app/helpers/spies';

import { PropertiesService } from 'src/app/services/properties/properties.service';
import { SharedModule } from 'src/app/shared/shared.module';

const trendingProperties = {
  data: {
    property: []
  }
};
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeAll(() => resetSpies([ propertiesServiceSpy ]));
  afterEach(() => resetSpies([ propertiesServiceSpy ]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SharedModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ HomeComponent ],
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
