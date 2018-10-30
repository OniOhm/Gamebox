import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  

  constructor(private cookieService:CookieService, private router: Router) { }

  ngOnInit() {
    if(this.cookieService.check('skipsplash')){
      this.router.navigate(['/LogSign']);
      console.log('cookie sensed');
    }else{
      this.cookieService.set('skipsplash', 'true');
      console.log('cookie created');
    }
  }
scrollTolFeature(){
 var elmnt = document.getElementById("splash_feature_container");
  elmnt.scrollIntoView();
}

}
