import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { localStorageSpy, toastServiceSpy } from 'src/app/helpers/tests/spies';
import { LoginFormComponent } from 'src/app/modules/authentication/components/login/login-form/login-form.component';
import { LoginComponent } from 'src/app/modules/authentication/components/login/login.component';
import {configureTestSuite} from 'ng-bullet';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        LoginComponent,
        LoginFormComponent,
      ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
        {
          provide: LocalStorageService,
          useValue: localStorageSpy,
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
