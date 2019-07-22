import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileSidebarComponent } from 'src/app/pages/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PersonalInformationComponent } from 'src/app/pages/profile/personal-information/personal-information.component';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    ProfileComponent,
    PersonalInformationComponent
  ],
  exports: [ProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ProfileService],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {}
