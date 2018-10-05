import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Form, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }
  @Output() accountChange = new EventEmitter<boolean>();

  ngOnInit() {
  }

  accountOff(){
    this.accountChange.emit(false);
  }

}
