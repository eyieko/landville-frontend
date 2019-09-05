import { TestBed, inject, fakeAsync, tick, async } from '@angular/core/testing';
import { Observable, Observer, of } from 'rxjs';
import { LoginFormComponent } from 'src/app/authentication/components/login/login-form/login-form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login/login.service';
import { AppModule } from 'src/app/app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { toastServiceSpy, httpServiceSpy } from 'src/app/helpers/tests/spies';
import { HttpClient } from 'selenium-webdriver/http';


describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let logInService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        LoginService,
        { provide: ToastrService, useValue: toastServiceSpy },
        { provide: HttpClient, useValue: httpServiceSpy}
      ],
      imports: [
        HttpClientTestingModule,
        AppModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule],

    });
    httpTestingController = TestBed.get(HttpTestingController);
    logInService = TestBed.get(LoginService);
  });

  function setup() {
    const fixture = TestBed.createComponent(LoginFormComponent);
    const userService = fixture.debugElement.injector.get(LoginService);
    return { fixture, userService };
  }
  it('it should be initialized', inject([LoginService], (loginService: LoginService) => {
    expect(loginService).toBeTruthy();
  }));

  it('should use the service', () => {
    const { userService } = setup();
    const mockUser = { name: 'Serem' };
    spyOn(userService, 'login').and.returnValue(
      Observable.create((observer: Observer<{ name: string }>) => {
        observer.next(mockUser);
        return observer;
      })
    );
  });
  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it(
    'should perform login correctly', () => {
      const responseObject = {
        success: true,
        message: 'login was successful'
      };
      const user = { email: 'test@example.com', password: 'testpassword' };
      httpServiceSpy.makeRequestWithData.and.returnValue(of(responseObject));
      logInService.login(user).subscribe(data => {
        expect(data).toEqual(responseObject);
      });
    }
  );

  it('should successfully logout a user', () => {
    const data = {
      message: 'Successful Logout'
    };
    logInService.logoutUser().subscribe((payload) => {
      expect(payload).toEqual(data);
    });
  });
});
