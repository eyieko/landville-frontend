import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TermsPageComponent } from 'src/app/components/terms/terms.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { InputErrorsComponent } from 'src/app/shared/components/input-errors/input-errors.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/shared/components/topbar/topbar.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  declarations: [
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    TermsPageComponent,
    CardComponent,
    InputErrorsComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    TopbarComponent,
    TermsPageComponent,
    CardComponent,
    InputErrorsComponent,
  ],
})
export class SharedModule {
}
