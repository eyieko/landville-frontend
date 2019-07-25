import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { Address } from 'src/app/models/Address';
import { removeSubscription } from 'src/app/shared/utils/helpers/unsubscribe';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit, OnDestroy {
  profileImage: string;
  firstName: string;
  lastName: string;
  userRole: string;
  // check if the user has set the address, defaults to false
  addressSet: boolean = false;
  address: Address;
  subscribe: Subscription[] = [];

  constructor(
    private profileService: ProfileService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.fetchProfile();
  }
  fetchProfile() {
    this.subscribe.push(
      this.profileService.getProfile().subscribe(response => {
        this.profileImage = response.data.profile.image;
        this.firstName = response.data.profile.user.first_name;
        this.lastName = response.data.profile.user.last_name;
        this.userRole = this.setRole(response.data.profile.user.role);
        if (Object.entries(response.data.profile.address).length < 3) {
          this.addressSet = false;
        } else {
          this.address = response.data.profile.address;
          this.addressSet = true;
        }
      })
    );
  }
  setRole(role: string): string {
    const roles = { CA: 'Client Admin', BY: 'Buyer', LA: 'LandVille Admin' };
    return roles[role];
  }
  updateImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      const uploadData = new FormData();
      uploadData.append('image', image);
      this.subscribe.push(
        this.profileService.updateProfile(uploadData).subscribe(
          response => {
            this.profileImage = response.data.profile.image;
            this.toastService.success('Your image was successfully updated.');
          },
          error => {
            const err = error.error.errors.image;
            this.toastService.error(
              `Could not update your profile image. ${err}`
            );
          }
        )
      );
    }
  }
  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
