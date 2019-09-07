import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: [ './password-reset.component.scss' ]
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  email: string;
  success: boolean;
  disabled = true;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private titleService: Title,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
    this.resetForm.valueChanges.subscribe(value => {
      this.disabled = this.resetForm.invalid;
    });
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
  }

  onSubmit() {
    this.loading = true;
    this.email = this.resetForm.get('email').value;

    this.authService.getResetLink(this.email).subscribe(res => {
        this.loading = false;
        this.success = true;
        this.toastrService.success(res.data.message);

      }, err => {
        this.loading = false;
        this.success = false;
      if (err.errors) {
        this.toastrService.error(err.errors.email);
      }
      }
    );
    this.disabled = true;
  }
}
