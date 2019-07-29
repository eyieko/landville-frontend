import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterResetPasswordService } from 'src/app/services/enter-reset-password.service';


@Component({
  selector: 'app-enter-reset-password',
  templateUrl: './enter-reset-password.component.html',
  styleUrls: ['./enter-reset-password.component.scss']
})
export class EnterResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  token: string;
  password: string;
  successMessage: string;
  tokenError: string;
  passwordError: boolean;
  disabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changePasswordService: EnterResetPasswordService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token
    });

    this.formGroup = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })

    this.formGroup.valueChanges.subscribe( value => {

      if(value.newPassword === value.confirmPassword){
        this.passwordError = false;
        this.disabled = false;
      } else{
        this.passwordError = true;
      }
      this.disabled = this.passwordError || this.formGroup.invalid;

      console.log(this.passwordError);
    })
  }
  onSubmit() {
    console.log(this.formGroup.valid);
    
    this.password = this.formGroup.get('newPassword').value

    this.changePasswordService.changePassword(this.token, this.password).subscribe(res =>{
      const { data: { message } } = res;
      this.successMessage = message;
    }, err =>{
      
      console.log(err);
      if (err.error.errors.token) {
        this.tokenError = 'Your session has expired, please restart the process';
      }
    })
  }

}
