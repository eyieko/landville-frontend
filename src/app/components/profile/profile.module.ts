import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FinancialInformationComponent } from 'src/app/components/profile/financial-information/financial-information.component';
import { PersonalInformationComponent } from 'src/app/components/profile/personal-information/personal-information.component';
import { ProfileSidebarComponent } from 'src/app/components/profile/profile-sidebar/profile-sidebar.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { AuthLayoutModule } from 'src/app/layouts/auth-layout/auth-layout.module';
import { RoleTransformPipe } from 'src/app/shared/pipes/role.pipe';

@NgModule({
  declarations: [
    ProfileSidebarComponent,
    ProfileComponent,
    PersonalInformationComponent,
    FinancialInformationComponent,
    RoleTransformPipe
  ],
  exports: [ ProfileComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AuthLayoutModule,
    RoundProgressModule
  ],
  providers: [],
  bootstrap: [ ProfileComponent ]
})
export class ProfileModule {
}
