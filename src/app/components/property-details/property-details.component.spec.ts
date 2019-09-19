import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReviewsComponent } from 'src/app/components/property-details/reviews/reviews.component';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { PropertyDetailComponent } from 'src/app/components/property-details/property-detail/property-detail.component';
import { ConfirmationModalComponent } from 'src/app/modules/shared/components/confirmation-modal/confirmation-modal.component';
import { PropertyDescriptionComponent } from 'src/app/components/property-details/property-description/property-description.component';
import { ClientAdminComponent } from 'src/app/components/property-details/client-admin/client-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import { By } from '@angular/platform-browser';
import {
  resetSpies,
  propertyDetailSpy,
  toastServiceSpy,
  routerSpy,
  localStorageSpy
} from 'src/app/helpers/tests/spies';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { responseObject } from 'src/app/helpers/tests/mocks';

describe('Property detail', () => {
  let component: PropertyDetailsComponent;
  let fixture: ComponentFixture<PropertyDetailsComponent>;

  const mockActivateRouteParam = {
    paramMap: of({ get: () => 'hello' })
  };

  beforeAll(() => resetSpies([propertyDetailSpy, localStorageSpy]));
  afterEach(() => resetSpies([propertyDetailSpy, localStorageSpy]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PropertyDetailsComponent,
        PropertyDetailComponent,
        PropertyDescriptionComponent,
        ConfirmationModalComponent,
        ClientAdminComponent,
        ReviewsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '**', component: PropertyDetailsComponent }
        ]),
        NgxSpinnerModule
      ],
      providers: [
        {
          provide: PropertyDetailService,
          useValue: propertyDetailSpy
        },
        {
          provide: LocalStorageService,
          useValue: localStorageSpy
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivateRouteParam
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailsComponent);
    component = fixture.componentInstance;
    propertyDetailSpy.getProperty.and.returnValue(of(responseObject));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProperties', () => {
    propertyDetailSpy.getProperty.and.returnValue(of(responseObject));
    spyOn(component, 'viewProperty');
    expect(propertyDetailSpy.getProperty).toHaveBeenCalled();
  });

  it('should call display the modal', () => {
    propertyDetailSpy.displayModalService.and.returnValue(of(true));
    expect(component.displayedModal).toBe(false);
  });
  it('should call close the modal', () => {
    expect(component.displayedModal).toBe(false);
  });
  it('should call displayModal ', fakeAsync(() => {
    component.isMine = true;
    fixture.detectChanges();
    spyOn(component, 'displayModal');
    const btn = fixture.debugElement.query(By.css('.testBtn'));
    btn.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.displayModal).toHaveBeenCalled();
  }));
});
