import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  users$;
  k;
  constructor(private resetService: PasswordResetService) {

  }

  ngOnInit() {
  }

  onSubmit() {
     this.k = this.resetService.getUsers().subscribe(data => {
       this.users$ = (data);
       console.log(JSON.stringify(this.users$));
      });
  }

}
