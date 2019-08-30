import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import {
  resetSpies,
  propertyDetailSpy,
  toastServiceSpy,
  routerSpy
} from 'src/app/helpers/tests/spies';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/modules/shared/components/confirmation-modal/confirmation-modal.component';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  let mockActivateRouteParam = {
    paramMap: of({ get: () => 'hello' })
  };

  beforeAll(() => resetSpies([propertyDetailSpy]));
  afterEach(() => resetSpies([propertyDetailSpy]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '**', component: ConfirmationModalComponent }
        ]),

        NgxSpinnerModule
      ],
      providers: [
        {
          provide: PropertyDetailService,
          useValue: propertyDetailSpy
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
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    propertyDetailSpy.deletePropertyService.and.returnValue(
      of({ message: 'successfully deleted' })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call deleteProperty method', () => {
    const result = { message: 'successfully deleted' };
    propertyDetailSpy.deletePropertyService.and.returnValue(of(result));
    component.deleteProperty();
    expect(component.message).toEqual(result.message);
  });
  it('should throw an error', () => {
    const errorMessage = {
      detail: 'You dont have a permission to perform such action'
    };
    propertyDetailSpy.deletePropertyService.and.returnValue(
      throwError({
        errors: {
          ...errorMessage
        }
      })
    );
    component.deleteProperty();

    expect(toastServiceSpy.error).toHaveBeenCalledWith(errorMessage.detail);
  });

  it('should display the modal method', () => {
    const result = false;
    propertyDetailSpy.displayModalService.and.returnValue(of(false));
    expect(component.isModalClosed).toBe(result);
  });
});
