import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs';
import { LoginFormComponent } from '../../pages/login/login-form/login-form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginService } from './login.service';
import { AppModule } from 'src/app/app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APPCONFIG } from '../../config';
import { toastServiceSpy } from '../../helpers/spies';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      AppModule,
      ReactiveFormsModule,
      FormsModule,
      ToastrModule.forRoot(),
      NgxSpinnerModule
    ],
    declarations: [LoginFormComponent],
    providers: [ LoginService, {provide: ToastrService, useValue: toastServiceSpy} ]
  }));

  function setup() {
    const fixture = TestBed.createComponent(LoginFormComponent);
    const userService = fixture.debugElement.injector.get(LoginService);
    return { fixture, userService };
  }
  it('it should be initialized', inject([LoginService], (loginService: LoginService) => {
       expect(loginService).toBeTruthy()
  }));

  it('should use the service', () => {
    const { fixture, userService } = setup();
    const mockUser = { name: 'Serem' };
    spyOn(userService, 'login').and.returnValue(
      Observable.create((observer: Observer<{ name: string}>) => {
        observer.next(mockUser);
        return observer;
      })
    );
  })
  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it(
    'should perform login correctly',
    fakeAsync(
      inject(
        [LoginService, HttpTestingController],
        (loginService: LoginService, backend: HttpTestingController) => {

          // Set up
          const url =APPCONFIG.base_url + loginService.loginUrl;
          const responseObject = {
            success: true,
            message: 'login was successful'
          };
          const user = {email:'test@example.com', password:'testpassword'}
          let response = null;
          // End Setup

          loginService.login(user).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
        
        }
      )
    )
  );
});
