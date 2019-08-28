import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Properties
  authenticated: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  subscription = new Subscription();


  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authenticated = false;
    this.firstName = '';
    this.lastName = '';
    this.profileImage = 'assets/img/people.png';

    // Check if user is authenticated
    this.setIsAuthenticated();
  }

  ngOnInit() {
    this.profileDetails();
  }

  profileDetails() {
    this.subscription.add(
      this.profileService.userProfile$.subscribe(res => {
        const profileData = res.data.profile;
        if (profileData.image) {
          this.profileImage = profileData.image;
        }
        this.firstName = profileData.user.first_name;
        this.lastName = profileData.user.last_name;
      })
    );
  }

  handleLogout() {
    this.subscription.add(
      this.authService.logoutUser().subscribe(
        _ => {
          this.clearStorage();
        },
        _ => {
          this.clearStorage();
        }
      ));
  }

  setIsAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    }
  }

  clearStorage() {
    localStorage.clear();
    this.router.navigate([ '/home' ]);
    this.authenticated = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
