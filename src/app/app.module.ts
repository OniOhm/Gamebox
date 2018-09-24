import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { myRoutes } from '../routes'

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { LogSignComponent } from './log-sign/log-sign.component'



@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LogSignComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
