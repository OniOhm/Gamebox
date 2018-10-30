import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  UserName: string;
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }
  ngDoCheck(){
    this.UserName = this.authService.userName;
  }
  // TODO: This isnt Amatuer hour
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
  logout(){
    this.authService.logout();
  }
}
