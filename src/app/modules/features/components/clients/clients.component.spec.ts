import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from 'src/app/modules/features/components/clients/clients.component';
import { clientsServiceSpy, toastServiceSpy } from 'src/app/helpers/tests/spies';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { clientsMockresponse } from 'src/app/helpers/tests/mocks';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';
import { resetSpies } from 'src/app/helpers/tests/social.spies';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeAll(() => resetSpies([toastServiceSpy, clientsServiceSpy]));
  afterEach(() => resetSpies([toastServiceSpy, clientsServiceSpy]));

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientsComponent,
      ],
      imports: [
        RouterTestingModule,
        NgxSpinnerModule
      ],
      providers: [
        { provide: ClientsService, useValue: clientsServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    }).compileComponents().then(r => {});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientsServiceSpy.fetchClientCompanies.and.returnValue(of(clientsMockresponse));
    fixture.detectChanges();
  });

  it('should create user interface', () => {
    expect(component).toBeTruthy();
  });

  it('should throw a toast error when error occurs', () => {
    clientsServiceSpy.fetchClientCompanies.and.returnValue(
      throwError({ errors: { details: 'error' } })
    );
    component.displayClients();
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      Object({ details: 'error' })
    );
  });
});
