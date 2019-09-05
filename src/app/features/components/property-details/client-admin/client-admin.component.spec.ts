import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdminComponent } from './client-admin.component';

describe('ClientAdminComponent', () => {
  let component: ClientAdminComponent;
  let fixture: ComponentFixture<ClientAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
