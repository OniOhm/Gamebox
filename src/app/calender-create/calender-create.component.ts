import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import {calenderService} from '../db/calender.service'
import {Event } from '../db/Event';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../gameTemp';
import { userPref } from '../userPrefs';
import { userprefencesService } from '../db/userprefences.service';

@Component({
  selector: 'app-calender-create',
  templateUrl: './calender-create.component.html',
  styleUrls: ['./calender-create.component.css']
})
export class CalenderCreateComponent implements OnInit {
  snapGames: Observable<any[]>;
  Events: Observable<any[]>;
  eventHolder: AngularFireList<any>;
  showNewEvent: boolean = true;
  EventNew: boolean = false;
  EventMain: boolean = true;
  neworUpdate: boolean = true;
  friends: any[];
  selectedEvent: Event = {
    title  : '',
    start  : '',
    Description: '',
    location: '',
    gameslist: '',
    userId : '',
    key : '',
  }
  EventTray = [
    {
      title  : '',
      start  : '',
      'Description': '',
      location: '',
        gameslist: '',
      userId: ''
    }
  ]

  gamePlayed = 'games that will be at event:';
  @Output() eventChange = new EventEmitter<boolean>();
  constructor(private calendarService: calenderService, private authservice: AuthService,private noti: userprefencesService, private db: AngularFireDatabase) {
    this.eventHolder = db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authservice.userName));
    this.Events = db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authservice.userName)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.snapGames = db.list('games' , ref => ref.orderByChild('userId').equalTo(this.authservice.userName)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }
  
  ngOnInit() {
    this.onGet();
    this.getFriends();

  }
  getFriends(){
    const fre = this.db.list('friends' , ref => ref.orderByChild('friendOf').equalTo(this.authservice.userName)).valueChanges();
    fre.subscribe(
      (Friends: any[]) => {
        this.friends = Friends;
      }
    )
  }
  hideEvent(){
    this.gamePlayed = 'games that will be at the event:';
    this.eventChange.emit();
  }
  onSubmit(form:NgForm){
    if(this.neworUpdate){
      const ref = this.db.list('/events');
      ref.push({    
          title: form.value.title,
          start: form.value.start,
          location: form.value.location,
          gameslist: this.gamePlayed,
          Description: form.value.description,
          userId: this.authservice.userName
      });
      this.noti.pushEventToFriends(this.authservice.userName,this.friends,form.value.title);
      this.hideEvent();
  }else{
    this.eventHolder.update(this.selectedEvent.key, {
      title: form.value.title,
      start: form.value.start,
      location: form.value.location,
      gameslist: this.gamePlayed,
      Description: form.value.description,
      userId: this.authservice.userName
    })
    this.neworUpdate = true;
    this.hideEvent();
    this.noti.pushUpdatedEventToFriends(this.authservice.userName,this.friends,form.value.title);
  }
  }
  addgame(game: Game){
    this.gamePlayed += ' ' + game.GameName;
    console.log(this.gamePlayed);
  }
  onGet(){
    const ref = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authservice.userName)).valueChanges();
    ref.subscribe(
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
  evenSelect(event: Event){
    console.log(event);
  }
 
  
  eventControl(choice: string){
    if(choice == "new"){
      this.neworUpdate = true;
      this.EventNew = true;
      this.EventMain = false;
      this.clearSelected();
    }else if(choice == "main"){
      this.EventNew = false;
      this.EventMain = true;
    } else if(choice == "update"){
      this.EventNew = true;
      this.EventMain = false;
      this.neworUpdate = false;
    }
  }
  deleteEvent(key: string , title:string){
    this.noti.pushDeletedEventToFriends(this.authservice.userName,this.friends,title);
    this.eventHolder.remove(key);
  }
  clearSelected(){
    this.selectedEvent.Description = '';
    this.selectedEvent.title = '';
    this.selectedEvent.location = '';
    this.selectedEvent.start = '';
    this.selectedEvent.gameslist = '';
  }
  updateEvent(event: Event){
    this.selectedEvent.Description = event.Description;
    this.selectedEvent.title = event.title;
    this.selectedEvent.location = event.location;
    this.selectedEvent.start = event.start;
    this.selectedEvent.gameslist = event.gameslist;
    this.selectedEvent.key = event.key;
    this.neworUpdate = false;
    this.eventControl("update");
  }

}
