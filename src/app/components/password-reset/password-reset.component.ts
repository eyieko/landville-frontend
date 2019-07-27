import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  email: string;
  successMessage: string;
  errMessage: string;

  constructor(private resetService: PasswordResetService) {
  }

  ngOnInit() {
  }

  onSubmit() {
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
