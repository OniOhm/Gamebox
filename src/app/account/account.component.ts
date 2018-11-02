import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Form, FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import {gameService} from '../db/game.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountName: string
  Event: number = 1;
  games: number;
  Games = [
    
  ];
  
  constructor(private AuthService: AuthService ,private gameService: gameService) { }

  @Output() accountChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.onGet();
  }
  ngDoCheck(){
    this.accountName = this.AuthService.userName;
    this.games = this.Games.length;
  }
  accountOff(){
    this.accountChange.emit(false);
  }
  onGet(){
    this.gameService.getGames()
    .subscribe(
      // outputs the object array and places it into the array
     (Games: any[]) => {
       this.Games = Games.filter(Game => Game.userId == this.AuthService.userName);
      },
      //  Gets the response and turns it into json data
      (error) => console.log(error),
      
    );
    }
}
