import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let de: DebugElement;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onsubmit method', async(() => {
    const registerForm = { value: { email: 'akram@gmail.com',
    first_name: 'akram', last_name: 'muakssa', role: 'CA', password: 'akram@100', confirmed_password: 'akram@100'}} as NgForm;
    component.onSubmit(registerForm);
    expect(component.onSubmit).toBeTruthy();
})
  );
  it('should call the onSubmit method when button is clicked', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('should be invalid', async(() => {
    component.registerForm.controls[`email`].setValue('');
    component.registerForm.controls[`first_name`].setValue('');
    component.registerForm.controls[`last_name`].setValue('');
    component.registerForm.controls[`role`].setValue('');
    component.registerForm.controls[`password`].setValue('');
    component.registerForm.controls[`confirmed_password`].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it('should be valid', async(() => {
    component.registerForm.controls[`email`].setValue('akram@gmail.com');
    component.registerForm.controls[`first_name`].setValue('akram');
    component.registerForm.controls[`last_name`].setValue('mukasa');
    component.registerForm.controls[`role`].setValue('CA');
    component.registerForm.controls[`password`].setValue('natasha@100');
    component.registerForm.controls[`confirmed_password`].setValue('natasha@100');
    expect(component.registerForm.valid).toBeTruthy();
  }));


});
