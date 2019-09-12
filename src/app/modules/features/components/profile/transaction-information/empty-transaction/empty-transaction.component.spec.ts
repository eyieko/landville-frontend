import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTransactionComponent } from './empty-transaction.component';

describe('EmptyTransactionComponent', () => {
  let component: EmptyTransactionComponent;
  let fixture: ComponentFixture<EmptyTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTransactionComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(EmptyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});