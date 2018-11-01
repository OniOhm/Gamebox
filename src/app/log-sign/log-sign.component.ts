import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-log-sign',
  templateUrl: './log-sign.component.html',
  styleUrls: ['./log-sign.component.css']
})
export class LogSignComponent implements OnInit {

  constructor(private router: Router , private authservice: AuthService) { 

  }
  login: boolean = true;
  Signup: boolean = false;
  showOtherLogin: boolean =false;
  ngOnInit() {
  }
  alert(){
    console.log('click');
  }
  // TODO: More Cleanup
  showLog(){
    if(this.login){
      this.login = false;
      this.Signup = true;
    }else if(this.Signup){
      this.login = true;
      this.Signup = false;  
    }
  }
  signSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.signupUser(email ,password);
  }
  LogSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.logInUser(email, password);
  }
  googleLog(){
    this.authservice.logInWithGoogle();
  }
  showAlts(){
    if(this.showOtherLogin){
      this.showOtherLogin = false;
    }else{
      this.showOtherLogin = true;
    }
  }
}
