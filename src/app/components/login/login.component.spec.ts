import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginFormComponent } from 'src/app/components/login/login-form/login-form.component';

import { LoginHeaderComponent } from 'src/app/components/login/login-header/login-header.component';
import { LoginSliderComponent } from 'src/app/components/login/login-slider/login-slider.component';

import { LoginComponent } from 'src/app/components/login/login.component';
import { toastServiceSpy } from 'src/app/helpers/spies';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        LoginComponent,
        LoginFormComponent,
        LoginHeaderComponent,
        LoginSliderComponent
      ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
