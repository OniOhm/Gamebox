import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Form, FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import {gameService} from '../db/game.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { userprefencesService } from '../db/userprefences.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountName: string;
  games: any[];
  friends: any[];
  FriendList: Observable<any[]>;
  FriendTray: AngularFireList<any[]>;
  accountFriend: boolean = false;
  accountMain: boolean = true;
  gameNumber: string;
  accountNumber: string;
 events: any[];
 eventNumber: string;
  
  constructor(private AuthService: AuthService ,private gameService: gameService,private noti: userprefencesService,private db: AngularFireDatabase) {
    this.FriendTray = db.list('friends' , ref => ref.orderByChild('friendOf').equalTo(this.AuthService.userName));
   }

  @Output() accountChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.getGames();
    this.getFriends();
    this.getEvents();
  }
  ngDoCheck(){
    this.accountName = this.AuthService.userName;
    this.accountNumber = this.friends.length.toString();
    this.gameNumber = this.games.length.toString();
    this.eventNumber = this.events.length.toString();
  }
  accountOff(){
    this.accountChange.emit(false);
  }
  getGames(){
   const ref = this.db.list('/games', ref => ref.orderByChild('userId').equalTo(this.AuthService.userName)).valueChanges();
   ref.subscribe(
    // outputs the object array and places it into the array
   (Games: any[]) => {
     this.games = Games;
    });
  }
  getFriends(){
    this.FriendList = this.db.list('friends' , ref => ref.orderByChild('userId').equalTo(this.AuthService.userName)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.FriendList.subscribe(
      (friends: any[]) => {
        this.friends = friends;
       });
       
  }
  getEvents(){
     const EventList = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.AuthService.userName)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    EventList.subscribe(
      (events: any[]) => {
        this.events = events;
       });
       
  }
  accountControl(page: string){
    if(page == "main"){
      this.accountMain = true;
      this.accountFriend = false;
    }else if(page == "friends"){
      this.accountMain = false;
      this.accountFriend = true;
    }
  }
  removeFriend(key: string,receiver: string){
    this.noti.pushDeletedFriend(this.AuthService.userName,receiver);
    this.FriendTray.remove(key);
  }
}
