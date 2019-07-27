import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterResetPasswordComponent } from './enter-reset-password.component';

describe('EnterResetPasswordComponent', () => {
  let component: EnterResetPasswordComponent;
  let fixture: ComponentFixture<EnterResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
