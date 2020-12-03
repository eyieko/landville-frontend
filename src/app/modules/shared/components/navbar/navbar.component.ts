import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('navbar', null) navbar;

  // Properties
  sticky;
  authenticated: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  subscription = new Subscription();


  constructor(
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private logoutService: LoginService,
    private router: Router
  ) {
    this.authenticated = false;
    this.firstName = '';
    this.lastName = '';
    this.profileImage = 'assets/img/people.png';

    // Check if user is authenticated

  }

  ngOnInit() {
    this.sticky = this.navbar.nativeElement.offsetTop
    this.profileDetails();
    this.setIsAuthenticated();
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

  stickNavbar() {

    if (window.pageYOffset >= this.sticky) {
      this.navbar.nativeElement.classList.add("sticky")

    } else {
      this.navbar.nativeElement.classList.remove("sticky");
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.stickNavbar()
  }


  handleLogout() {
    this.subscription.add(
      this.logoutService.logoutUser().subscribe(
        _ => {
          this.clearStorage();
        },
        _ => {
          this.clearStorage();
        }
      ));
  }
  setIsAuthenticated() {
    const token = this.localStorageService.get('token', false);
    if (token) {
      this.authenticated = true;
    }
  }

  clearStorage() {
    this.localStorageService.clear();
    this.router.navigate(['/home']);
    this.authenticated = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
