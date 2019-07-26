import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { UserProfileUpdateErrorResponse } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { removeSubscription } from 'src/app/shared/utils/helpers/unsubscribe';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  subscribe: Subscription[] = [];
  formErrors: UserProfileUpdateErrorResponse = {
    errors: {
      phone: false
    }
  };
  profileForm: FormGroup;
  firstName = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );
  lastName = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );
  emailAddress = new FormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.email
  ]);
  street = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  phone = new FormControl('', [Validators.required, Validators.minLength(14)]);
  employer = new FormControl('');
  designation = new FormControl('');
  nextOfKin = new FormControl('');
  nextOfKinContact = new FormControl('', Validators.minLength(14));
  bio = new FormControl('');
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.profileForm = fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      street: this.street,
      city: this.city,
      state: this.state,
      phone: this.phone,
      employer: this.employer,
      designation: this.designation,
      nextOfKin: this.nextOfKin,
      nextOfKinContact: this.nextOfKinContact,
      bio: this.bio
    });
  }

  ngOnInit() {
    this.setProfile();
  }
  setProfile() {
    this.spinner.show();
    this.subscribe.push(
      this.profileService.getProfile().subscribe(
        profile => {
          const profileData = profile.data.profile;
          // we use `patchValue` because the response from the server might not have prefilled address information
          this.profileForm.patchValue({
            firstName: profileData.user.first_name,
            lastName: profileData.user.last_name,
            emailAddress: profileData.user.email,
            street: profileData.address.Street,
            city: profileData.address.City,
            state: profileData.address.State,
            phone: profileData.phone,
            employer: profileData.employer,
            designation: profileData.designation,
            nextOfKin: profileData.next_of_kin,
            nextOfKinContact: profileData.next_of_kin_contact,
            bio: profileData.bio
          });
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.toasterService.error(error.error.errors);
        }
      )
    );
  }
  resetFormErrors() {
    this.formErrors = {
      errors: {
        phone: false
      }
    };
  }
  saveProfile() {
    this.spinner.show();
    const addressData = {
      Street: this.profileForm.controls.street.value,
      City: this.profileForm.controls.city.value,
      State: this.profileForm.controls.state.value
    };
    // the backend expects to pick address from an `address` dictionary that
    // does not exist on the form yet. Add the dictionary and pass it with input values
    this.profileForm.addControl('address', new FormControl({}));
    this.profileForm.patchValue({
      address: addressData
    });
    this.subscribe.push(
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        profile => {
          const profileData = profile.data.profile;
          this.profileForm.patchValue({
            firstName: profileData.user.first_name,
            lastName: profileData.user.last_name,
            emailAddress: profileData.user.email,
            street: profileData.address.Street,
            city: profileData.address.City,
            state: profileData.address.State,
            phone: profileData.phone,
            employer: profileData.employer,
            designation: profileData.designation,
            nextOfKin: profileData.next_of_kin,
            nextOfKinContact: profileData.next_of_kin_contact,
            bio: profileData.bio
          });
          this.resetFormErrors();
          this.spinner.hide();
          this.toasterService.success(profile.data.message);
        },
        error => {
          this.spinner.hide();
          this.formErrors = error.error;
          for (const [key, value] of Object.entries(this.formErrors.errors)) {
            this.toasterService.error(
              `Could not update your profile.
              ${key}: ${value}`
            );
          }
        }
      )
    );
  }
  ngOnDestroy(): void {
    removeSubscription(this.subscribe);
  }
}
