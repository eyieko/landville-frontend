import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company/company.service';
import { Company } from '../../models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  // Validation messages.
  validationMessages = {
    companyName: [
      { type: 'required', message: 'Company Name required.' }
    ],
    phone: [
      { type: 'required', message: 'Phone Number required.' },
      { type: 'minlength', message: 'Phone Number must be at least 5 characters long.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email is invalid.' },
    ],
    street: [
      { type: 'required', message: 'Street is required.' },
      { type: 'minlength', message: 'Street must be at least 2 characters long.' },
    ],
    state: [
      { type: 'required', message: 'State is required.' },
      { type: 'minlength', message: 'Street must be at least 2 characters long.' },
    ],
    city: [
      { type: 'required', message: 'City is required.' },
      { type: 'minlength', message: 'Street must be at least 2 characters long.' },
    ],
  };
  private payload: Company;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private titleService: Title) {
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.companyDetailForm.controls;
  }

  ngOnInit() {
    this.createForm();
    this.loadClientCompany();
    this.titleService.setTitle('Create client company');


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

  onSubmitCompanyDetails({ value, invalid }) {
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
      .subscribe(_ => {
        this.loading = false;
        this.toastrService.success('Company registered successfully.');
        this.router.navigate(['/']);
      }, error => {
        this.toastrService.error(JSON.stringify(error.errors));
        this.loading = false;
      });
  }

  loadClientCompany() {
    this.companyService.getCompanyDetails().pipe(first()).subscribe(data => {
      this.toastrService.warning('You already have a company registered to this account.');
      this.router.navigate(['/']);
    });
  }
}
