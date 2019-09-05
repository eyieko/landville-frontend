import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TermsPageComponent } from 'src/app/features/components/terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LocalStorageService,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    TermsPageComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    TopbarComponent,
    TermsPageComponent
  ],
})
export class ComponentsModule {
}
