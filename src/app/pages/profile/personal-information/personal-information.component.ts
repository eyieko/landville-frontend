import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { removeSubscription } from 'src/app/shared/utils/helpers';

import { UserProfile, UserProfileForm } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { Subscription } from 'rxjs';

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
  @Output() getAddredssUpdate: EventEmitter<any> = new EventEmitter();
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.subscribe.push(
      this.profileService.getProfile().subscribe(profile => {
        this.profile = profile.data.profile;
        this.profile.id = profile.data.profile.id;
        console.log(this.profile);
        this.loading = false;
      })
    );
  }
  saveProfile({ value, valid }: { value: UserProfileForm; valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      this.subscribe.push(
        this.profileService.updateProfile(this.profile).subscribe(response => {
          this.profile = response.data.profile;
          this.getAddredssUpdate.emit(response.data.profile.address);
          console.log(this.getAddredssUpdate);
        })
      );
    }
  }
  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
