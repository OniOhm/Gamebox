import { Component, OnInit,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  showNewGame: boolean=false;
  @Output() gameChange = new EventEmitter;
  constructor() { }

  ngOnInit() {
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

}
