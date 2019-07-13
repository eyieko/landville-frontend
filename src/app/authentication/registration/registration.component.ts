import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from './services/register-service.service';
import { Registerdetails } from '../registration/models/register-details';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeruser: Registerdetails[];
  constructor(private registerServiceService: RegisterServiceService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    // this.registeruser = this.registerServiceService;
  }
  registerUser(register: Registerdetails) {
    this.registerServiceService.registerUser(register). subscribe(
      response => {
      this.toastrService.success('Check your email to verify', 'Successfully created an account' );
      console.log(response);
      this.registeruser.push(register);
    },
    err => {
      this.toastrService.error('Invalid request', 'Check your inputs');
      console.log(err.error);
    }
    );

  }
}
