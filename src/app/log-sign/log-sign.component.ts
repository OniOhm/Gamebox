import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-sign',
  templateUrl: './log-sign.component.html',
  styleUrls: ['./log-sign.component.css']
})
export class LogSignComponent implements OnInit {

  constructor() { }
  login: boolean = true;
  Signup: boolean = false;
  ngOnInit() {
  }
  alert(){
    console.log('click');
  }
  showLog(){
    if(this.login){
      this.login = false;
      this.Signup = true;
    }else if(this.Signup){
      this.login = true;
      this.Signup = false;  
    }
  }
}
