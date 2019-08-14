import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  declarations: [ FooterComponent, NavbarComponent, CustomErrorComponent ],
  exports: [ NavbarComponent, FooterComponent, CustomErrorComponent ]
})
export class ComponentsModule {}
