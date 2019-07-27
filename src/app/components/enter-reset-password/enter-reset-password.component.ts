import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'app-enter-reset-password',
  templateUrl: './enter-reset-password.component.html',
  styleUrls: ['./enter-reset-password.component.scss']
})
export class EnterResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params, '>>>>>>>>>>>');
    });

    this.form = new FormGroup({
      newPassword: new FormControl(),
      confirmPassword: new FormControl()
    });
  }
  onSubmit() {
    console.log(this.form.value);
  }

}
