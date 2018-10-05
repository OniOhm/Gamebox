import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  @Output() gameChange = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }
  gameListOff(){
    this.gameChange.emit();
  }
}
