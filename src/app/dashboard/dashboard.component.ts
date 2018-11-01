import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { calenderService } from '../db/calender.service';
import { Event } from '../db/Event';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  
  UserName: string;
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  constructor(private authService: AuthService,private calendarService:calenderService) { }
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
      events: [
        {
          title  : 'event1',
          start  : '2018-10-01',
          'Description': 'Dummy'
        }
      ]
      // ToDO: explore other data sources
    };
  }
  ngDoCheck(){
    this.UserName = this.authService.userName;
  }

// Calender control
eventClick(event: Event){
  this.selectedEvent = event;
  console.log(this.selectedEvent);
}

onSubmit(form: NgForm){
  // this.EventSingle.push({    
  //     title: form.value.title,
  //     start: form.value.start,
  //     Description: form.value.description
  // });

  // this.calendarService.storeOneEvent(this.EventSingle).subscribe(
  //   (response) => console.log(response),
  //   (error) => console.log(error)
  // );
}

rerender(){ 
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





  // TODO: This isnt Amatuer hour
  showAccount(){
    this.viewAccount = true;
  }
  showGameslist(){
    this.viewGamelist = true;
  }
  showEvent(){
    this.viewCallCalender = true;
  }

  hideAccount(){
    this.viewAccount = false;
  }
  hideGameslist(){
    this.viewGamelist = false;
  }
  hideCallEvent(){
    this.viewCallCalender = false;
  }
  logout(){
    this.authService.logout();
  }
}
