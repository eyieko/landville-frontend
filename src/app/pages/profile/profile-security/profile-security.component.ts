import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-security',
  templateUrl: './profile-security.component.html',
  styleUrls: ['./profile-security.component.scss']
})
export class ProfileSecurityComponent implements OnInit {
  subscribe: Subscription[] = [];
  formData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.formData = this.fb.group({
      answer: ['', [ Validators.required, Validators.maxLength(5) ]],
      question: [, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {}

  submitForm({ value, invalid }) {
    console.log('VALUE', value);
    this.profileService.updateProfile(value).subscribe(
      profile => {
        const profileData = profile.data.profile;
        this.toasterService.success(profile.data.message);
        this.profileService.pushProfile();
      },
      error => {
        this.spinner.hide();
        for (const [key, value] of Object.entries(error.errors)) {
          this.toasterService.error(
            `Could not update your profile.
            ${key}: ${value}`
          );
        }
      }
    );

    console.log(value);
  }
}
