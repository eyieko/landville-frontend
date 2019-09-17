import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  hideSpinner: boolean = false;
  clientId: number;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.pushProfile();
    this.getUserProfile();
  }

  getUserProfile() {
    this.hideSpinner = true;
    this.subscription.add(
      this.profileService.getProfile().subscribe(response => {
        this.clientId = response.data.profile.user.id;
        setTimeout(() => {
          this.hideSpinner = false;
        }, 2000);
      },
        err => {
          console.log(err);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
