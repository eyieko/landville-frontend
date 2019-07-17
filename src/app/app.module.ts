import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {ComponentsModule} from './components/components.module';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ComponentsModule,
  ],
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    CommonLayoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
