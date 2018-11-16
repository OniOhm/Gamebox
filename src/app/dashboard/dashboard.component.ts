import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { calenderService } from '../db/calender.service';
import { Event } from '../db/Event';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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
  editEvents: Observable<any[]>;
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  masterEvents: AngularFireList<any>;
  pub: boolean = false;
  priv: boolean = true;
  constructor(private authService: AuthService,private calendarService:calenderService,private db: AngularFireDatabase) { 
    this.masterEvents = db.list('/events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName));
    
  }
  
  // Event holders
selectedEvent: Event = {
  title: '',
  start: '',
  Description: '',
  key: ' '
  }

// data: Event[] = [
//   {
//     title  : 'event1',
//     start  : '2018-10-01',
//     'Description': 'Dummy'
//   },
//   {
//     title  : 'event2',
//     start  : '2018-10-01',
//     'Description': 'Dummy'
//   },
// ];
privateTray = [
  {
    title  : 'stuff',
    start  : '2018-10-01',
    'Description': 'Things'
  }
]
publicTray = [
  {
    title  : 'stuff',
    start  : '2018-10-01',
    'Description': 'Things'
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
  }
  ngDoCheck(){
    this.UserName = this.authService.userName;
    
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

// onSubmit(form: NgForm){
//   this.EventTray.push({    
//       title: form.value.title,
//       start: form.value.start,
//       Description: form.value.description
//   });

  
//   this.calendarService.storeEvents(this.EventTray).subscribe(
//     (response) => console.log(response),
//     (error) => console.log(error)
//   );
// }

rerender(){ 
  this.ucCalendar.fullCalendar('removeEvents');
  this.privateTray.forEach(el => {
    this.ucCalendar.fullCalendar('renderEvent', el); 
  });
  this.ucCalendar.fullCalendar('rerenderEvents');
}


onGet(){
  // this.calendarService.getEvents()
  // .subscribe(
  //   // outputs the object array and places it into the array
  //  (Events: any[]) => {
  //    this.EventTray = Events;
  //   //  
  //    console.log(this.EventTray);
  //   },
  //   //  Gets the response and turns it into json data
  //   (error) => console.log(error),
  // );

  const ref = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  // const ref = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName)).valueChanges();
  ref.subscribe(
    (Events: any[]) => {
      this.privateTray = Events;
    }
  )
  const pub = this.db.list('events').valueChanges();
  pub.subscribe(
    (Events: any[]) => {
      this.publicTray = Events;
    }
  )
  console.log(this.publicTray);
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
  logout(){
    this.authService.logout();
  }
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
}
