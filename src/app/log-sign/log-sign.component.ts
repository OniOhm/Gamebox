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
  showOtherLogin: boolean = false;
  passWarn: boolean = false;
  retypeWarn: boolean = false;
  
  password: string = '';
  reType: string = '';


  ngOnInit() {
  }
  alert(){
    if(this.password.length !== 6){
      this.passWarn = true;
    }else{
      this.passWarn = false;
    }
  }
  otherLog(){
    this.showOtherLogin = false;
  }
 
  // TODO: More Cleanup
  showLog(){
   if(this.Signup){
      this.login = true;
      this.Signup = false;  
    }
    
  }
  showSign(){
    if(this.login){
      this.login = false;
      this.Signup = true;
    }
  }
  signSubmit(form: NgForm){
    if(this.password !== this.reType){
      this.passWarn = false;
      this.retypeWarn = true;
    }else{
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.signupUser(email ,password);
    this.showLog();
    }
  }
  LogSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.logInUser(email, password);
  }
  googleLog(){
    this.authservice.logInWithGoogle();
  }
  githubLog(){
    this.authservice.logInWithGithub();
  }
  

  showAlts(){
    if(this.showOtherLogin){
      this.showOtherLogin = false;
    }else{
      this.showOtherLogin = true;
    }
  }
  hideAlternatives(){
    this.showAlts();
  }
}
