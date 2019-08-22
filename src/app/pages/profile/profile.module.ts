import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthLayoutModule } from 'src/app/layouts/auth-layout/auth-layout.module';
import { PersonalInformationComponent } from 'src/app/pages/profile/personal-information/personal-information.component';

import { ProfileSidebarComponent } from 'src/app/pages/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
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
    NgxSpinnerModule,
		AuthLayoutModule,
  ],
  providers: [],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {}
