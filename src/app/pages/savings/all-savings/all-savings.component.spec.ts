import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSavingsComponent } from './all-savings.component';

describe('AllSavingsComponent', () => {
  let component: AllSavingsComponent;
  let fixture: ComponentFixture<AllSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
