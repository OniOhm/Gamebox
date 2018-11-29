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
  
  constructor(private AuthService: AuthService ,private gameService: gameService,private noti: userprefencesService,private db: AngularFireDatabase) {
    this.FriendTray = db.list('friends' , ref => ref.orderByChild('friendOf').equalTo(this.AuthService.userName));
   }

  @Output() accountChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.getGames();
    this.getFriends();
  }
  ngDoCheck(){
    this.accountName = this.AuthService.userName;

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
  removeFriend(key: string,receiver: string){
    this.noti.pushDeletedFriend(this.AuthService.userName,receiver);
    this.FriendTray.remove(key);
  }
}
