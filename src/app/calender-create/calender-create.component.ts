import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calender-create',
  templateUrl: './calender-create.component.html',
  styleUrls: ['./calender-create.component.css']
})
export class CalenderCreateComponent implements OnInit {

  @Output() eventChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  hideEvent(){
    this.eventChange.emit();
  }
}
