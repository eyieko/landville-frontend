import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/register/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent implements OnInit {
  registeruser: User[];

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags);
    });

  }

  registerUser(register: User) {
    this.spinner.show();
    this.authService.registerUser(register).subscribe(
      response => {
        this.toastrService.success(response.data.message);
        this.spinner.hide();
        this.router.navigate([ 'registersuccess' ]);
      },
      error => {
        this.toastrService.error(error.error.errors.email[0]);
        this.spinner.hide();
      }
    );

  }
}
