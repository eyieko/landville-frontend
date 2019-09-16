import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { NavbarComponent } from 'src/app/modules/shared/components/navbar/navbar.component';
import { TopbarComponent } from 'src/app/modules/shared/components/topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from 'src/app/modules/shared/components/card/card.component';
import { InputErrorsComponent } from 'src/app/modules/shared/input-errors/input-errors.component';
import { ConfirmationModalComponent } from 'src/app/modules/shared/components/confirmation-modal/confirmation-modal.component';
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
    ConfirmationModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    CardComponent,
    InputErrorsComponent,
    ConfirmationModalComponent
  ],
})
export class SharedModule {
}
