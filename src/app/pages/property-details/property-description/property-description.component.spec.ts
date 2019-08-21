import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDescriptionComponent } from './property-description.component';

describe('PropertyDescriptionComponent', () => {
  let component: PropertyDescriptionComponent;
  let fixture: ComponentFixture<PropertyDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
