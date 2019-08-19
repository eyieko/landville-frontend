import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPaymentStatusComponent } from './international-payment-status.component';

describe('InternationalPaymentStatusComponent', () => {
  let component: InternationalPaymentStatusComponent;
  let fixture: ComponentFixture<InternationalPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalPaymentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
