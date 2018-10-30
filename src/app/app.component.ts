import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gamebox';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAek61XkZ7GCdX9h3_dlJl0gaXDX-hlJ8c",
      authDomain: "capstone-24a83.firebaseapp.com",
    })
  }
}
