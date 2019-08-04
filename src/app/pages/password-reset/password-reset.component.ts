import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password/password-reset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  email: string;
  success: boolean;
  disabled: boolean = true;
  loading: boolean;

  constructor(
    private resetService: PasswordResetService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.resetForm.valueChanges.subscribe( value => {
      this.disabled = this.resetForm.invalid;
    });
  }

  onSubmit() {
    this.loading  = true;
    this.email = this.resetForm.get('email').value;

    this.resetService.getResetLink(this.email).subscribe(res => {
      this.loading  = false;
      this.success = true;
      this.toastrService.success(res.data.message,'', {timeOut: 3000});

    }, err => {
      this.loading  = false;
      this.success = false;
      if (err.errors) this.toastrService.error(err.errors.email,'', {timeOut: 3000});
    }
    );
    this.disabled = true;
  }
}
