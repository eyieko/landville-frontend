import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UserProfile, UserProfileForm } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { removeSubscription } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  profile: UserProfile;
  loading: boolean = true;
  subscribe: Subscription[] = [];
  @ViewChild('profileForm', { static: false }) profileForm: any;
  constructor(
    private profileService: ProfileService,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {
    this.subscribe.push(
      this.profileService.getProfile().subscribe(profile => {
        this.profile = profile.data.profile;
        this.loading = false;
      })
    );
  }
  showSuccess() {
    this.toasterService.success('Your profile was succesfully updated!');
  }
  showError(error: string) {
    this.toasterService.error(error);
  }
  saveProfile({ value, valid }: { value: UserProfileForm; valid: boolean }) {
    if (!valid) {
      return;
    } else {
      this.subscribe.push(
        this.profileService.updateProfile(this.profile).subscribe(
          response => {
            this.profile = response.data.profile;
            this.showSuccess();
          },
          error => {
            this.showError('Could not update your profile ' + error);
            let err;
            // for (err of error.error.errors) {
            //   console.log(err);
            // }
            console.log(error.error);
          }
        )
      );
    }
  }
  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
