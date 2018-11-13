import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Game } from '../gameTemp';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { gameService } from '../db/game.service';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {
  recieveGames: AngularFireList<any>;
  snapGames: Observable<any[]>;
  showNewGame: boolean=false;
  showGameDetail: boolean = false;
  gameDetailDetail: boolean = true;
  gameDetailEdit: boolean = false; 
  @Output() gameChange = new EventEmitter;
  constructor(private AuthService: AuthService ,private gameService: gameService, private db: AngularFireDatabase){
    this.recieveGames = db.list('games' , ref => ref.orderByChild('userId').equalTo(this.AuthService.userName));
    this.snapGames = db.list('games' , ref => ref.orderByChild('userId').equalTo(this.AuthService.userName)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }
   selectedGame: Game = {
    GameName: '',
    GameDescript: '',
     additional: '',
     date: '',
     rules: '',
     creator: '',
     numOfPlay: '',
     Favorite: null,
    userId: this.AuthService.userName,
    key: '',
  };
  ngOnInit() {
    console.log(this.recieveGames);
  }
  gameListOff(){
    this.gameChange.emit();
  }
  showGameList(){
    if(this.showNewGame == true){
      this.showNewGame = false;
      console.log(this.showNewGame);
    }else{
      this.showNewGame = true;
    }

  }
  Detailcontrol(){
    if(this.showGameDetail == true){
      this.showGameDetail = false;
      }else{
        this.showGameDetail = true;
      }
      console.log('click');
    }
    onSelect(game: Game){
      this.selectedGame = game;
      this.selectedGame.key = game.key;
      console.log(this.selectedGame);
      this.showGameDetail = true;
    }
    detailChangeDetail(){
      if(!this.gameDetailDetail){
        this.gameDetailDetail = true;
        this.gameDetailEdit = false;
      }
    }
    detailChangeEdit(){
      if(!this.gameDetailEdit){
        this.gameDetailEdit = true;
        this.gameDetailDetail = false;
      }
    }

    addNewGame(form: NgForm){
      const ref = this.db.list('games');
      ref.push({
        GameName: form.value.GameName,
        GameDescript: form.value.GameDescript,
        userId: this.AuthService.userName,
        additional: form.value.additional,
        date: form.value.date,
        rules: form.value.rules,
        creator: form.value.creator,
        numOfPlay: form.value.numOfPlay,
        Favorite: null,
      })
      this.showGameList();
    }
    editNewGame(form: NgForm) {
      this.recieveGames.update(this.selectedGame.key,{
        GameName: form.value.GameName,
        GameDescript: form.value.GameDescript,
        userId: this.AuthService.userName,
        additional: form.value.additional,
        date: form.value.date,
        rules: form.value.rules,
        creator: form.value.creator,
        numOfPlay: form.value.numOfPlay,
      });
      console.log(form);
      this.Detailcontrol();
    }
    DeleteGame(key: string){
    this.recieveGames.remove(key)
  }
  
}


