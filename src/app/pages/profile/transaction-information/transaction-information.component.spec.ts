import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInformationComponent } from './transaction-information.component';

describe('TransactionInformationComponent', () => {
  let component: TransactionInformationComponent;
  let fixture: ComponentFixture<TransactionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
