import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
  profileImage: string;
  firstName: string;
  lastName: string;
  userRole: string;
  // check if the user has set the address, defaults to false
  addressSet: boolean = false;
  address: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(response => {
      this.profileImage = response.data.profile.image;
      this.firstName = response.data.profile.user.first_name;
      this.lastName = response.data.profile.user.last_name;
      this.userRole = response.data.profile.user.role;
      if (Object.keys(response.data.profile.address).length === 0) {
        this.addressSet = false;
      } else {
        this.address = response.data.profile.address;
        this.addressSet = true;
      }
    });
  }
}
