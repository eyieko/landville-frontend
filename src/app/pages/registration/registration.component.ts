import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../../services/register/register-service.service';
import { Registerdetails } from '../../models/register/register-details';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeruser: Registerdetails[];


  constructor(private registerServiceService: RegisterServiceService,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
  }
  registerUser(register: Registerdetails) {
    this.spinner.show();
    this.registerServiceService.registerUser(register). subscribe(
      response => {
      this.toastrService.success(response.data.message);
      this.router.navigate(['/registersuccess']);
      this.spinner.hide();
      // this.registeruser.push(register);
    },
    error => {
      this.toastrService.error(error.error.errors.email[0]);
      this.spinner.hide();
    }
    );

  }
}
