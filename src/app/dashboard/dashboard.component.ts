import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showAccount(){
    this.viewAccount = true;
  }
  showGameslist(){
    this.viewGamelist = true;
  }
  showEvent(){
    this.viewCallCalender = true;
  }

  hideAccount(){
    this.viewAccount = false;
  }
  hideGameslist(){
    this.viewGamelist = false;
  }
  hideCallEvent(){
    this.viewCallCalender = false;
  }
}
