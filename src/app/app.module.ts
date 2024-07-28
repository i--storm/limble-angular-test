import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {UserToggleDirective} from "./user-toggle.directive";

import { AppComponent } from './app.component';

@NgModule({

  imports: [
    BrowserModule,UserToggleDirective

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
