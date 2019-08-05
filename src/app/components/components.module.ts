import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { TermsPageComponent } from '../pages/terms/terms.component';
=======
import { TermsComponent } from './terms/terms.component';
>>>>>>> ft(terms): Enable users to activate terms of use on registration

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
<<<<<<< HEAD
    TopbarComponent, TermsPageComponent],
  exports: [NavbarComponent, FooterComponent, TopbarComponent, TermsPageComponent]
=======
    TopbarComponent, TermsComponent],
  exports: [NavbarComponent, FooterComponent, TopbarComponent, TermsComponent]
>>>>>>> ft(terms): Enable users to activate terms of use on registration
})
export class ComponentsModule {
}
