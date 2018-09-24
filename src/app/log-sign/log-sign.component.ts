import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-sign',
  templateUrl: './log-sign.component.html',
  styleUrls: ['./log-sign.component.css']
})
export class LogSignComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  alert(){
    console.log('click');
  }
}
