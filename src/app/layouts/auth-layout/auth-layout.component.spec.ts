import {async, TestBed} from '@angular/core/testing';

import {AuthLayoutComponent} from './auth-layout.component';
import {RouterTestingModule} from '@angular/router/testing';


describe('AuthLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthLayoutComponent]
    }).compileComponents();
  }));

  it('should create the authLayoutComponent', () => {
    const fixture = TestBed.createComponent(AuthLayoutComponent);
    const authLayoutComponent = fixture.debugElement.componentInstance;
    expect(authLayoutComponent).toBeTruthy();
  });
});

