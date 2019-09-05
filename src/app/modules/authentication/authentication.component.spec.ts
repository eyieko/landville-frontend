import { async, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthenticationComponent]
    }).compileComponents();
  }));

  it('should create the authLayoutComponent', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authLayoutComponent = fixture.debugElement.componentInstance;
    expect(authLayoutComponent).toBeTruthy();
  });
});
