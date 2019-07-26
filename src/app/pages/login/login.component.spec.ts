import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import {LoginComponent} from './login.component';

import { LoginHeaderComponent } from './login-header/login-header.component';
import { LoginSliderComponent } from './login-slider/login-slider.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { toastServiceSpy } from '../../helpers/spies'


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
      declarations: [
        LoginComponent,
        LoginFormComponent,
        LoginHeaderComponent,
        LoginSliderComponent,
        SocialLoginComponent
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceSpy}
      ]
    })
      .compileComponents();
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
