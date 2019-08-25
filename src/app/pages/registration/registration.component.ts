import {Component, OnInit} from '@angular/core';
import {RegisterServiceService} from '../../services/register/register-service.service';
import {User} from '../../models/register/user';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeruser: User[];
  returnUrl: string;


  constructor(private registerServiceService: RegisterServiceService,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: Title,
              private metaService: Meta
  ) {
  }

  ngOnInit() {
    // get return url from route parameters  or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.setPageMetaData();
  }

  registerUser(register: User) {
    this.spinner.show();
    this.registerServiceService.registerUser(register).subscribe(
      response => {
        this.toastrService.success(response.data.message);
        this.spinner.hide();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.toastrService.error(error.error.errors.email[0]);
        this.spinner.hide();
      }
    );

  }

  private setPageMetaData() {
    this.titleService.setTitle('Register | Create a free account today!');
    this.metaService.addTags(
      [
        // Open Graph Data
        { property: 'og:title' , content: 'Register | Create a free account today!'  },
        {property: 'og:description',
          content: 'Create an access so you can can get access to a wide range of property investment options'},
        // Twitter
        {name: 'twitter:title', content: 'Register | Create a free account today!'},
        {name: 'twitter:description', content: 'Create an access so you can can get access to a wide range of property investment options'},
      ]);
  }
}
