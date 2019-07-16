import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileSidebarComponent } from 'src/app/pages/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PersonalInformationComponent } from 'src/app/pages/profile/personal-information/personal-information.component';

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    ProfileComponent,
    PersonalInformationComponent
  ],
  exports: [ProfileComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {}
