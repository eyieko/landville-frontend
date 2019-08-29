import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPaymentStatusComponent } from './international-payment-status.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InternationalPaymentStatusComponent', () => {
  let component: InternationalPaymentStatusComponent;
  let fixture: ComponentFixture<InternationalPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ InternationalPaymentStatusComponent ],
      providers: []
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
