import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password/password-reset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  email: string;
  successMessage: string;
  errMessage: string;
  loading: boolean;

  constructor(
    private resetService: PasswordResetService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.email = this.resetForm.get('email').value;

    this.resetService.getResetLink(this.email).subscribe(res => {
      this.successMessage = 'success';
      this.loading = true;
    }, err => {
      this.errMessage = err;
      this.loading = false;
    }
    );
  }
}
