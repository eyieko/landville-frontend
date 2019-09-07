import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-enter-reset-password',
  templateUrl: './enter-reset-password.component.html',
  styleUrls: [ './enter-reset-password.component.scss' ]
})
export class EnterResetPasswordComponent implements OnInit {
  enterPasswordForm: FormGroup;
  token: string;
  password: string;
  passwordError: boolean;
  disabled = true;
  success: boolean;
  loading: boolean;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.activatedRoute.data.subscribe(data => {
        this.titleService.setTitle(data.title);
      });
    });

    this.enterPasswordForm = this.fb.group({
      newPassword: [ '', [ Validators.required, Validators.minLength(6) ] ],
      confirmPassword: [ '', Validators.required ]
    });

    this.enterPasswordForm.valueChanges.subscribe(value => {

      if (value.newPassword === value.confirmPassword) {
        this.passwordError = false;
        this.disabled = false;
      } else {
        this.passwordError = true;
      }
      this.disabled = this.passwordError || this.enterPasswordForm.invalid;

    });
  }

  onSubmit() {
    this.loading = true;
    this.password = this.enterPasswordForm.get('newPassword').value;

    this.authService.changePassword(this.token, this.password).subscribe(res => {
      const { data: { message } } = res;
      this.toastrService.success(message, '', { timeOut: 3000 });
      this.success = true;
      this.loading = false;


    }, err => {
      this.loading = false;
      this.success = false;
      if (err.errors.password) {
        this.message = err.errors.password;
      } else {
        this.message = err.errors.token;
      }
      this.toastrService.error(this.message);
    });

    this.disabled = true;
  }

}
