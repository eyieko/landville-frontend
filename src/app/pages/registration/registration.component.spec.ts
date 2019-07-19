import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterHeaderComponent } from './register-header/register-header.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterServiceService } from 'src/app/services/register/register-service.service';
import { Registerdetails } from 'src/app/models/register/register-details';
import { HttpTestingController } from '@angular/common/http/testing';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  // let toastr = () => ({ success: ''});
  // let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent,
        RegisterFormComponent, RegisterHeaderComponent, RegistersuccessComponent],
      imports: [NgxSpinnerModule,
        ReactiveFormsModule, HttpClientModule ,
      ToastrModule.forRoot()],
        //  providers: [{provide: ToastrService, useValue: toastr}, {provide: NgxSpinnerService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//   it('should return right response', () => {
//     const service: RegisterServiceService = TestBed.get(RegisterServiceService);
//     const someObject = spyOn(toastr, 'success').and.returnValue();
//     const mockData: Registerdetails = {
//       email: 'akram@andela.com',
//       first_name: 'akram', last_name: 'mukasa', role: 'CA',
//       password: 'akram100', confirmed_password: 'akram100', data: ''
//     };
//     service.registerUser(mockData).subscribe();
//     expect(someObject.success).toHaveBeenCalled();
//     const req = httpMock.expectOne(`${service.registerUrl}/register`);
//   });
});
