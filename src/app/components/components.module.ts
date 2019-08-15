import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';

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
    TopbarComponent],
  exports: [NavbarComponent, FooterComponent, TopbarComponent]
})
export class ComponentsModule {
}
