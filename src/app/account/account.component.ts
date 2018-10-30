import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Form, FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountName: string
  constructor(private authService: AuthService) { }
  @Output() accountChange = new EventEmitter<boolean>();

  ngOnInit() {
  }
  ngDoCheck(){
    this.accountName = this.authService.userName;
  }
  accountOff(){
    this.accountChange.emit(false);
  }

}
