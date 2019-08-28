import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { registerServiceSpy, resetSpies, toastServiceSpy } from 'src/app/helpers/spies';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeAll(() => resetSpies([ registerServiceSpy ]));
  afterEach(() => resetSpies([ registerServiceSpy ]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent,
        RegisterFormComponent,
        RegistersuccessComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        NgxSpinnerModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: registerServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test registering a user and return right response ', () => {
    const User = {
      email: 'akram@andela.com',
      first_name: 'akram',
      last_name: 'mukasa',
      role: 'CA',
      password: 'akram100',
      confirmed_password: 'akram100',
      data: ''
    };
    const response = {
      data: {
        user: {
          email: 'akram@nator.com',
          first_name: 'akram',
          last_name: 'mukasa',
          role: 'CA'
        },
        message:
          'Account created successfully,please check your mailbox to activate your account ',
        status: 'success'
      }
    };

    registerServiceSpy.registerUser.and.returnValue(of(response));
    component.registerUser(User);
    expect(toastServiceSpy.success).toHaveBeenCalledWith(response.data.message);
  });

  it('should throw error', () => {
    const User = {
      email: 'akram@andela.com',
      first_name: 'akram',
      last_name: 'mukasa',
      role: 'CA',
      password: 'akram100',
      confirmed_password: 'akram100',
      data: ''
    };
    const errorMessage = {
      error: {
        errors: {
          email: [ 'Email is undefined' ]
        }
      }
    };
    registerServiceSpy.registerUser.and.returnValue(throwError(errorMessage));
    component.registerUser(User);
    expect(toastServiceSpy.error).toHaveBeenCalledWith(
      errorMessage.error.errors.email[0]
    );
  });
});
