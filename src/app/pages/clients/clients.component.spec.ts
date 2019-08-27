import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { DebugElement } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { AppModule } from 'src/app/app.module';
import { clientsServiceSpy, resetSpies } from './../../helpers/spies';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthLayoutModule } from 'src/app/layouts/auth-layout/auth-layout.module';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { of } from 'rxjs';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let debugElement: DebugElement;

  const clients_url =
    'https://landville-backend-web-api.herokuapp.com/api/v1/auth/clients/';

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
  // beforeAll(() => resetSpies([ClientsService]));
  // afterEach(() => resetSpies([ClientsService]));
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent, CardComponent],
      imports: [AppModule, NgxSpinnerModule, AuthLayoutModule],
      providers: [
        {
          provide: ClientsService,
          useValue: clientsServiceSpy
        }
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
});
