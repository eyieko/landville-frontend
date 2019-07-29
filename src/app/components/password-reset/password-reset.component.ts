import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  formGroup: FormGroup;
  email: string;
  successMessage: string;
  errMessage: string;

  constructor(
    private resetService: PasswordResetService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    this.email = this.formGroup.get('email').value;
    console.log(this.formGroup.get('email').valid);
    
    
    this.resetService.getResetLink(this.email).subscribe(res => {
      const { data: { message } } = res;
      this.successMessage = message;
      this.errMessage = '';

    }, err => {
      this.errMessage = err;
      this.successMessage = '';

    }
    );
  }
}
