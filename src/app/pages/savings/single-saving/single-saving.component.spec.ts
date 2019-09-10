import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSavingComponent } from './single-saving.component';

describe('SingleSavingComponent', () => {
  let component: SingleSavingComponent;
  let fixture: ComponentFixture<SingleSavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
