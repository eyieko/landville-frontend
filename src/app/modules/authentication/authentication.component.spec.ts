import { async, TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from 'src/app/modules/authentication/authentication.component';
import { RouterTestingModule } from '@angular/router/testing';
import {configureTestSuite} from 'ng-bullet';

describe('AuthLayoutComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthenticationComponent]
    }).compileComponents();
  });

  it('should create the authLayoutComponent', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    const authLayoutComponent = fixture.debugElement.componentInstance;
    expect(authLayoutComponent).toBeTruthy();
  });
});
