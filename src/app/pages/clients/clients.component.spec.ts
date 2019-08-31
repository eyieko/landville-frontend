import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { DebugElement } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { AppModule } from 'src/app/app.module';
import {
  clientsServiceSpy,
  resetSpies,
  toastServiceSpy
} from './../../helpers/spies';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  const Mockresponse = {
    data: {
      client_companies: [
        {
          address: { City: 'Mawokota', State: 'Uganda', Street: 'Kamwokya' },
          client_admin: 47,
          client_name: 'company',
          email: 'landvilleadmin03@doc-mail.net',
          id: 4,
          phone: '+256 736 3232234'
        }
      ],
      message: 'You have retrieved all clients'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [AppModule, NgxSpinnerModule],
      providers: [
        {
          provide: ClientsService,
          useValue: clientsServiceSpy
        },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;

    clientsServiceSpy.fetchClientCompanies.and.returnValue(of(Mockresponse));
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
