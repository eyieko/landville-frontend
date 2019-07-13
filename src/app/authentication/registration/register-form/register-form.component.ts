import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() registerUser: EventEmitter<any> = new EventEmitter();

  email: string;
  first_name: string; 
  last_name: string;
  password: string;
  confirmed_password: string;
  role: string;


  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    const register = {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      confirmed_password: this.confirmed_password,
      role: this.role,
      password: this.password
    };
    this.registerUser.emit(register);
  }

}
