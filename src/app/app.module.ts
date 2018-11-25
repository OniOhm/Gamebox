import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderCreateComponent } from './calender-create/calender-create.component';
import { AccountComponent } from './account/account.component';
import { GamelistComponent } from './gamelist/gamelist.component';


import { AuthService } from './auth/auth.service';
import { authGuard } from './auth/auth-gaurd.service';
import { CookieService } from 'ngx-cookie-service';
import { gameService } from './db/game.service';
import { calenderService } from './db/calender.service';
import {userprefencesService } from './db/userprefences.service';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalenderCreateComponent,
    AccountComponent,
    GamelistComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    
  ],
  providers: [AuthService, CookieService ,authGuard,gameService,calenderService,AngularFireDatabase,userprefencesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
