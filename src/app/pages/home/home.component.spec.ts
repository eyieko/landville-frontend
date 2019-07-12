import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {FormsModule} from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('testing form the wrong way', () => {
    component.onSubmit({value: {}, valid: false});
    expect(component.form.submitted).toEqual(false);
  });

  it('testing form the right way', () => {
    const testForm = {
      value: {
        firstName: 'alpha',
        lastName: 'landville',
        email: 'alpha@gmail.com',
      },
      valid: true,
    };
    component.onSubmit(testForm);
    expect(component.user.email).toEqual(testForm.value.email);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
