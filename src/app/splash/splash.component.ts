import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }
scrollTolFeature(){
 var elmnt = document.getElementById("splash_feature_container");
  elmnt.scrollIntoView();
}
}
