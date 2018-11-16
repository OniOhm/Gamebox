import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import {calenderService} from '../db/calender.service'
import {Event } from '../db/Event';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-calender-create',
  templateUrl: './calender-create.component.html',
  styleUrls: ['./calender-create.component.css']
})
export class CalenderCreateComponent implements OnInit {

 
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
  EventTray = [
    {
      title  : '',
      start  : '',
      'Description': '',
      userId: ''
    }
  ]
  @Output() eventChange = new EventEmitter<boolean>();
  constructor(private calendarService: calenderService, private authservice: AuthService, private db: AngularFireDatabase) {
    
   }
  
  ngOnInit() {
    // this.onGet();
  }

  hideEvent(){
    this.eventChange.emit();
  }
  onSubmit(form:NgForm){
    const ref = this.db.list('/events');
    ref.push({    
        title: form.value.title,
        start: form.value.start,
        Description: form.value.description,
        userId: this.authservice.userName
    });
    this.hideEvent();
  }
  
  // onGet(){
  //   this.calendarService.getEvents()
  //   .subscribe(
  //     // outputs the object array and places it into the array
  //    (Events: any[]) => {
  //      this.EventTray = Events;
  //     //  
  //      console.log(this.EventTray);
  //     },
  //     //  Gets the response and turns it into json data
  //     (error) => console.log(error),
  //   );
  // }
}
