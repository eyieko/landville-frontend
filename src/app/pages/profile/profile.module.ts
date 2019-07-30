import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ProfileSidebarComponent } from 'src/app/pages/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PersonalInformationComponent } from 'src/app/pages/profile/personal-information/personal-information.component';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { RoleTransformPipe } from 'src/app/shared/pipes/role.pipe';

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    ProfileComponent,
    PersonalInformationComponent,
    RoleTransformPipe
  ],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [ProfileService],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {}
