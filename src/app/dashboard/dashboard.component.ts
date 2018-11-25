import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { calenderService } from '../db/calender.service';
import { Event } from '../db/Event';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { userPref } from '../userPrefs';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { userprefencesService } from '../db/userprefences.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  eventTitle: string;
  eventDescription: string;
  eventStart: string;
  UserName: string;
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  pub: boolean = false;
  priv: boolean = true;
  showFriends: boolean= false;
  notifcations: string;
  refer: Observable<any[]>;
  friends: any[];
  friendNumber: string;
  DropFriendlist: boolean = false;
  constructor(private authService: AuthService,private calendarService:calenderService,private db: AngularFireDatabase, private userPref: userprefencesService) { 
    // this.masterEvents = db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName));
    
  }
  
  // Event holders
selectedEvent: Event = {
  title: '',
  start: '',
  location: '',
    gameslist: '',
  Description: '',
  key: ' '
  }
  
privateTray = [
  {
    title  : 'stuff',
    start  : '2018-10-01',
    location: '',
    gameslist: '',
    'Description': 'Things'
  }
]
publicTray = [ ]
prefs = [
  {
    userId: '',
    friendOf: '',
  }
]

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      height: 380,
      events: this.privateTray,
      eventSources: [
        
      ]
      // ToDO: explore other data sources
    };
    this.onGet();
    this.getPref();
  }
  ngDoCheck(){
    this.UserName = this.authService.userName; 
    this.friendNumber = this.prefs.length.toString();
  }

// Calender control
eventClick(event: any){
  this.selectedEvent = event;
  console.log(event);
  this.eventTitle = event.event.title;
  this.eventStart = event.event.start._i;
  this.eventDescription = event.event.Description;
  console.log(this.selectedEvent.key);
}


rerender(){ 
  this.ucCalendar.fullCalendar('removeEvents');
  this.privateTray.forEach(el => {
    this.ucCalendar.fullCalendar('renderEvent', el); 
  });
  this.ucCalendar.fullCalendar('rerenderEvents');
}

onGet(){
  const ref = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  ref.subscribe(
    (Events: any[]) => {
      this.privateTray = Events;
    },
  )
  const pub = this.db.object('events').valueChanges();
  pub.subscribe(
    (Events: any[]) => {
      this.publicTray = Events;
    }
  )  
}
getPref(){
  this.refer = this.db.list('friends', ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
    
  );

  this.refer.subscribe(
    (Events: any[]) => {
      this.prefs = Events;
    },
  )
  
  console.log(this.prefs);
  this.showFriends = true;
}

// Child Component controls
  showAccount(){
    if(!this.viewAccount){
      this.viewAccount = true;
    }else{
      this.viewAccount = false;
    }
  }
  showGameslist(){
    if(!this.viewGamelist){
      this.viewGamelist = true;
    }else{
      this.viewGamelist = false;
    }  
  }
  showEvent(){
    if(!this.viewCallCalender){
      this.viewCallCalender = true;
    }else{
      this.viewCallCalender = false;
     console.log('here');
     this.rerender();
    }
  }
  showFriendList(){
    if(this.DropFriendlist){
      this.DropFriendlist = false;
    }else{
      this.DropFriendlist = true;
    }
  }
  logout(){
    this.authService.logout();
  }
  // Switch between a public calender and a private
  pubPriv(){
    if(!this.priv){
      this.priv = true;
      this.pub = false;
      this.rerender();
    }else if(!this.pub){
      this.priv = false;
      this.pub = true;

      this.ucCalendar.fullCalendar('removeEvents');
      this.publicTray.forEach(el => {
        this.ucCalendar.fullCalendar('renderEvent', el); 
      });
      this.ucCalendar.fullCalendar('rerenderEvents');
  }
 
}
tryFriend(){
  this.userPref.pushFriend(this.UserName,"something");
}

}
