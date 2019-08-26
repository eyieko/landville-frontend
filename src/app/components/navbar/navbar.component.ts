import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
    private localStorageService: LocalStorageService,
    private eRef: ElementRef,
  ) {
    this.authenticated = false;
    this.firstName = '';
    this.lastName = '';
    this.profileImage = 'assets/img/people.png';

    // Check if user is authenticated
    const token = this.localStorageService.get('token', false);
    if (token) {
      this.authenticated = true;
    }
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
    LoginService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
