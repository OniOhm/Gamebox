import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderCreateComponent } from './calender-create/calender-create.component';
import { AccountComponent } from './account/account.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { NewGameComponent } from './new-game/new-game.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalenderCreateComponent,
    AccountComponent,
    GamelistComponent,
    NewGameComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
