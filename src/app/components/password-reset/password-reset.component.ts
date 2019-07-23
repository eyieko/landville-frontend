import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  email: string;

  constructor(private resetService: PasswordResetService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.resetService.getResetLink(this.email).subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }
}
