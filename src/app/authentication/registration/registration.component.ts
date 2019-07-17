import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from './services/register-service.service';
import { Registerdetails } from '../registration/models/register-details';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeruser: Registerdetails[];

  // public errorMsg;
  constructor(private registerServiceService: RegisterServiceService,
              private toastrService: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  registerUser(register: Registerdetails) {
    this.spinner.show();
    this.registerServiceService.registerUser(register). subscribe(
      response => {
      this.toastrService.success(response.data.message);
      console.log(response);
      this.spinner.hide();
      this.registeruser.push(register);
    },
    error => {
      // this.errorMsg = error;
      this.toastrService.error(error.error.errors.email[0]);
      console.log(error.error);
      this.spinner.hide();
    }
    );

  }
}
