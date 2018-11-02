import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import {calenderService} from '../db/calender.service'
import {Event } from '../db/Event';

@Component({
  selector: 'app-calender-create',
  templateUrl: './calender-create.component.html',
  styleUrls: ['./calender-create.component.css']
})
export class CalenderCreateComponent implements OnInit {

 
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
  @Output() eventChange = new EventEmitter<boolean>();
  constructor(private calendarService: calenderService) { }
  EventTray = [ ]
  ngOnInit() {
    this.onGet();
  }

  hideEvent(){
    this.calendarService.storeEvents(this.EventTray)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.eventChange.emit();
  }
  onSubmit(form:NgForm){
    this.EventTray.push({    
        title: form.value.title,
        start: form.value.start,
        Description: form.value.description
    });
    console.log(this.EventTray);
    this.hideEvent();
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
}
