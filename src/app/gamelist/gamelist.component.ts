import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Game } from '../gameTemp';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { gameService } from '../db/game.service';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {
  selectedGame: Game = {
    GameName: '',
    GameDescript: '',
    userId: this.AuthService.userName,
  };
  
  showNewGame: boolean=false;
  showGameDetail: boolean = false;

  Games = [
    
  ];

 
  @Output() gameChange = new EventEmitter;
  constructor(private AuthService: AuthService ,private gameService: gameService) { }

  ngOnInit() {
    this.onGet();
  }
  gameListOff(){
    this.gameService.storeGame(this.Games)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
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
  addToList(newGame: Game){
    // this.games.push(newGame);
    console.log('hit');
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
      console.log(this.selectedGame);
      this.showGameDetail = true;
    }

    addNewGame(form: NgForm){
      this.Games.push(
        {
          GameName: form.value.GameName,
          GameDescript: form.value.GameDescript,
          userId: this.AuthService.userName
        });
      this.showGameList();
    }
      onGet(){
        this.gameService.getGames()
        .subscribe(
          // outputs the object array and places it into the array
         (Games: any[]) => {
           this.Games = Games.filter(Game => Game.userId == this.AuthService.userName);
           console.log(this.Games);
          },
          //  Gets the response and turns it into json data
          (error) => console.log(error),
          
        );
        
      }
    }
  

}
