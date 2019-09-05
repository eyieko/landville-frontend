import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TermsPageComponent } from 'src/app/components/terms/terms.component';
import {CardComponent} from './components/card/card.component';
import {InputErrorsComponent} from './input-errors/input-errors.component';

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
    CardComponent,
    InputErrorsComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    CardComponent,
    InputErrorsComponent,
  ],
})
export class SharedModule {
}
