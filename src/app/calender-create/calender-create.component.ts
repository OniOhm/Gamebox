import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import {calenderService} from '../db/calender.service'
import {Event } from '../db/Event';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../gameTemp';

@Component({
  selector: 'app-calender-create',
  templateUrl: './calender-create.component.html',
  styleUrls: ['./calender-create.component.css']
})
export class CalenderCreateComponent implements OnInit {
  snapGames: Observable<any[]>;
  Events: Observable<any[]>;
  showNewEvent: boolean = false;
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
  constructor(private calendarService: calenderService, private authservice: AuthService, private db: AngularFireDatabase) {
    // this.eventGames = db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authservice.userName));
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
  }

  hideEvent(){
    this.gamePlayed = 'games that will be at event:';
    this.eventChange.emit();
  }
  onSubmit(form:NgForm){
    const ref = this.db.list('/events');
    ref.push({    
        title: form.value.title,
        start: form.value.start,
        location: form.value.location,
        gameslist: this.gamePlayed,
        Description: form.value.description,
        userId: this.authservice.userName
    });
    this.hideEvent();
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
}
