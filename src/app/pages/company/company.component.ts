import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../services/company/company.service';
import {Company} from '../../models';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  // Properties
  companyDetailForm: FormGroup;
  submitted = false;
  loading = false;
  validationMessages = {
    companyName: [
      {type: 'required', message: 'Company Name required.'}
    ],
    phone: [
      {type: 'required', message: 'Phone Number required.'},
      {type: 'minlength', message: 'Phone Number must be at least 5 characters long.'},
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'email', message: 'Email is invalid.'},
    ],
    street: [
      {type: 'required', message: 'Street is required.'},
      {type: 'minlength', message: 'Street must be at least 2 characters long.'},
    ],
    state: [
      {type: 'required', message: 'State is required.'},
      {type: 'minlength', message: 'Street must be at least 2 characters long.'},
    ],
    city: [
      {type: 'required', message: 'City is required.'},
      {type: 'minlength', message: 'Street must be at least 2 characters long.'},
    ],
  };
  private payload: Company;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService) {
    // TODO: redirect to home if company is already created.
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.companyDetailForm.controls;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.companyDetailForm = this.fb.group({
      companyName: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required,
      ])),
      street: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required,
      ])),
    });
  }

  onSubmitCompanyDetails({value, invalid}) {
    this.submitted = true;

    if (invalid) {
      return;
    }
    this.loading = true;
    this.payload = {
      client_name: value.companyName,
      phone: value.phone,
      email: value.email,
      address: {
        Street: value.street,
        City: value.city,
        State: value.state,
      }
    };
    this.companyService.createCompany(this.payload as Company)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.loading = false;
      }, error => {

        console.log(error);
        this.loading = false;
      });
  }
}
