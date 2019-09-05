import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { PersonalInformationComponent } from 'src/app/features/components/profile/personal-information/personal-information.component';
import { ProfileSidebarComponent } from 'src/app/features/components/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/features/components/profile/profile.component';
import { RoleTransformPipe } from 'src/app/shared/pipes/role.pipe';
import { FinancialInformationComponent } from 'src/app/features/components/profile/financial-information/financial-information.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    ProfileComponent,
    PersonalInformationComponent,
    FinancialInformationComponent,
    RoleTransformPipe
  ],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AuthenticationModule,
    RoundProgressModule
  ],
  providers: [],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {}
