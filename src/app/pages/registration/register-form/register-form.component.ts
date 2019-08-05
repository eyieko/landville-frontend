import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { mustMatch } from '../../../helpers/passwordvalidator';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() registerUser: EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmed_password: string;
  role: string;
  submitted = undefined;
  userAccepts: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      confirmed_password: [null, Validators.compose([Validators.required])],
      userAccepts: [false, Validators.requiredTrue]
    }, {
        validator: mustMatch('password', 'confirmed_password')

      });
  }
  onSubmit(register: NgForm) {
    this.registerUser.emit(register);


  }

}
