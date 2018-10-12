import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() hideGame = new EventEmitter;
  
  hideAddGame(){
    this.hideGame.emit();
  }

}
