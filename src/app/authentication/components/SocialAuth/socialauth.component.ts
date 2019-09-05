import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/SocialAuth/socialauth.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-social-login',
  templateUrl: './socialauth.component.html',
  styleUrls: ['./socialauth.component.scss']
})
export class SocialLoginComponentt {
  user: SocialUser = null;
  loggedIn: boolean;
  loading: boolean = true;


  // inject services and depe
  constructor(
    private socialAuthService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  signInWithGoogle() {
    this.spinner.show();
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.loginService
          .createGoogleUser({
            google: { access_token: userData.idToken }
          })
          .subscribe(result => {
            this.spinner.hide();
            localStorage.setItem('token', result.token);
            this.router.navigate(['/home']);
          });
      })
      .catch(error => {
        this.toastr.error(error);
        this.spinner.hide();
      });
  }

  signInWithFB() {
    this.spinner.show();
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.loginService
          .createFacebookUser({
            facebook: { access_token: userData.authToken }
          })
          .subscribe(result => {
            this.spinner.hide();
            localStorage.setItem('token', result.token);
            this.router.navigate(['/home']);
          });
      })
      .catch(error => {
        this.spinner.hide();
        this.toastr.error(error);
      });
  }
}
