import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { calenderService } from '../db/calender.service';
import { Event } from '../db/Event';
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
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  masterEvents: AngularFireList<any>;

  constructor(private authService: AuthService,private calendarService:calenderService,db: AngularFireDatabase) { 
    // this.masterEvents = db.list('/events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName));
  }
  
  // Event holders
selectedEvent: Event = {
  title: '',
  start: '',
  'Description': '',
  }

data: Event[] = [
  {
    title  : 'event1',
    start  : '2018-10-01',
    'Description': 'Dummy'
  },
  {
    title  : 'event2',
    start  : '2018-10-01',
    'Description': 'Dummy'
  },
];
EventTray = [
  {
    title  : '',
    start  : '',
    'Description': ''
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
      events: [],
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
}

onSubmit(form: NgForm){
  this.EventTray.push({    
      title: form.value.title,
      start: form.value.start,
      Description: form.value.description
  });

  
  this.calendarService.storeEvents(this.EventTray).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  );
}

rerender(){ 
  this.ucCalendar.fullCalendar('removeEvents');
  this.EventTray.forEach(el => {
    this.ucCalendar.fullCalendar('renderEvent', el); 
  });
  this.ucCalendar.fullCalendar('rerenderEvents');
}


onGet(){
  this.calendarService.getEvents()
  .subscribe(
    // outputs the object array and places it into the array
   (Events: any[]) => {
     this.EventTray = Events;
    //  
     console.log(this.EventTray);
    },
    //  Gets the response and turns it into json data
    (error) => console.log(error),
  );
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
    }   
  }
  logout(){
    this.authService.logout();
  }
}
