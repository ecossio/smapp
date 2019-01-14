import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask'

import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { PersonaNewComponent } from './components/persona-new/persona-new.component';
import { PersonaEditComponent } from './components/persona-edit/persona-edit.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    LoginComponent,
    PersonaNewComponent,
    PersonaEditComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    NgxMaskModule.forRoot()

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
