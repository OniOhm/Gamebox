import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { calenderService } from '../db/calender.service';
import { Event } from '../db/Event';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { userPref } from '../userPrefs';

import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { userprefencesService } from '../db/userprefences.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  Creator: string;
  eventStart: string;
  UserName: string;
  eventGames: string;
  viewAccount: boolean = false;
  viewGamelist: boolean = false;
  viewCallCalender: boolean = false;
  addFriend: boolean = false;
  pub: boolean = false;
  priv: boolean = true;
  showFriends: boolean= false;
  notifcations: string;
  refer: Observable<any[]>;
  notificationList: Observable<any[]>;
  DropNotification: boolean = false;
  friends: any[];
  friendsEvents: any[];
  friendObserve: Observable<any[]>;
  friendNumber: string;
  DropFriendlist: boolean = false;
  notiNumber = ''; 
  constructor(private authService: AuthService,private calendarService:calenderService,private db: AngularFireDatabase, private userPref: userprefencesService) { 
    const d = db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName));
    
  }
 
  // Event holders
selectedEvent: Event = {
  title: '',
  start: '',
  location: '',
    gameslist: '',
  Description: '',
  key: ' ',
  userId: ''
  }
  
privateTray = [];
FriendTray = [

];
publicTray = [
  {
    title  : 'stuff',
    start  : '2018-10-01',
    location: '',
    gameslist: '',
    'Description': 'Things',
    userId: ''
  }
 ]
prefs = [

]
notifcationTray = [
  {
    type: 'email',
        startDate: '',
        userId: ''
  }
]

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      height: 380,
      events: this.privateTray,
      eventSources: [
        
      ],
      // ToDO: explore other data sources
      eventColor: '#29ABE2'
    };
    this.getPrivate();
    this.getPublic();
    this.getFriends();
    this.getNoti();
   
  }
  ngDoCheck(){
    this.UserName = this.authService.userName; 
    this.friendNumber = this.prefs.length.toString(); 
  }

// Calender control
eventClick(event: any){
  this.selectedEvent = event;
  console.log(event);
  this.eventTitle = event.event.title;
  this.eventStart = event.event.start._i;
  this.eventDescription = event.event.Description;
  this.Creator = event.event.userId;
  this.eventLocation = event.event.location;
  this.eventGames = event.event.gameslist;
  console.log(this.selectedEvent.key);
}

// removes events from fullcalender
// performs for each fucntion on privateTray array and renders each event in tray
// rerenders fullcalender
rerender(){
  if(this.priv){
  this.ucCalendar.fullCalendar('removeEvents');
  this.privateTray.forEach(el => {
    this.ucCalendar.fullCalendar('renderEvent', el); 
  });
  this.ucCalendar.fullCalendar('rerenderEvents');
  }else{
    this.ucCalendar.fullCalendar('removeEvents');
    this.FriendTray.forEach(el => {
      this.ucCalendar.fullCalendar('renderEvent', el); 
    });
    this.ucCalendar.fullCalendar('rerenderEvents');
  }
}
// Connects to the db and retireves entries from the events table
// Assigns the pub variable and assigns it to the db query results
// subscribes to the observable refer and pushes results into the publicTray array
getPrivate(){
  const ref = this.db.list('events' , ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  ref.subscribe(
    (Events: any[]) => {
      this.privateTray = Events;
    },
  )
}
// Connects to the db and retireves entries from the events table
// Assigns the pub variable and assigns it to the db query results
// subscribes to the observable refer and pushes results into the publicTray array
getPublic(){
  const pub = this.db.list('events').snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  pub.subscribe(
    (Events: any[]) => {
      this.publicTray = Events;
    }
  )
  console.log(this.publicTray);  
}
// Connects to the db and retireves entries from the friends table
// Assigns the refer observable  to the db query results
// subscribes to the observable refer and pushes results into the prefs array
getFriends(){
  this.refer = this.db.list('friends', ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ) 
  );
  this.refer.subscribe(
    (friends: any[]) => {
      this.prefs = friends;
    },
  )
  console.log(this.prefs);
  this.showFriends = true;
}
// Connects to the db and retrieves the notifications table
// Assigns the observable notificaitonList to db results
// subscribes to the observable and places results into notificationTray[]
// Records length of recieved array
getNoti(){
this.notificationList = this.db.list('notifications', ref => ref.orderByChild('userId').equalTo(this.authService.userName)).snapshotChanges().pipe(
  map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  )
  );
    this.notificationList.subscribe(
      (notifcations: any[]) => {
        this.notifcationTray = notifcations;
        this.notiNumber = notifcations.length.toString();
      }
    )
    console.log(this.notiNumber);
}
// Child Component controls
  showAccount(){
    if(!this.viewAccount){
      this.viewAccount = true;
    }else{
      this.viewAccount = false;
    }
  }
  showGameslist(){
    if(!this.viewGamelist){
      this.viewGamelist = true;
    }else{
      this.viewGamelist = false;
    }  
  }
  showEvent(){
    if(!this.viewCallCalender){
      this.viewCallCalender = true;
    }else{
      this.viewCallCalender = false;
     this.rerender();
    }
  }
  showFriendList(){
    if(this.DropFriendlist){
      this.DropFriendlist = false;
    }else{
      this.DropFriendlist = true;
      this.DropNotification = false;
    }
  }
  toggleAddFriend(){
    if(this.addFriend){
      this.addFriend = false;
    }else{
      this.addFriend = true;
      
      this.showFriendList();
    }
  }
  toggleNotification(){
    if(this.DropNotification){
      this.DropNotification = false;
    }else{
      this.DropNotification = true;
      this.DropFriendlist = false;
    }
  }
  // Log user out and clears token
  logout(){
    this.authService.logout();
  }

  // Switch between a public calender and a private
  pubPriv(){
    if(!this.priv){
      this.priv = true;
      this.pub = false;
    }else if(!this.pub){
      this.priv = false;
      this.pub = true;
      console.log(this.publicTray);
      this.getFriendsEvents();
      
  }
  
}
renderEvents(){
  if(this.priv){
    this.rerender();
  }else{
    this.renderPublic();
  }
}
addFriendNoti(noti: NgForm){
  this.userPref.pushFriendNotification(this.UserName,noti.value.user);
  this.toggleAddFriend();
}

// Accepts the friend request from sender and pushes an two friend objects into the friend table
// calls the pushNewFriendNotification method from the userprefences service with the sender and reciver
// as perameters 
acceptFriend(key:string,sender:string,reciever:string){
const ref = this.db.list('/friends');
ref.push({
  friendOf: reciever,
  userId: sender
});
ref.push({
  friendOf: sender,
  userId: reciever
});
this.userPref.pushNewFriendNotification(sender, reciever);
const noti = this.db.list('/notifications').remove(key);
}

// A method that removes the notification from the list based on its firebase key
// It also calles pushDeclineFriendNotification from the userprefences service
declineFriend(key: string,reciever:string,sender:string){
  this.userPref.pushDeclineFriendNotification(sender,reciever);
 const ref = this.db.list('/notifications').remove(key);

}
// Removes a notification in the list based on its firebase key
deleteNoti(key: string){
  const ref = this.db.list('/notifications').remove(key);
}


// Gets friend events from event table and pushes each of their events into a single array
// This array is then assigned to publicTray[]
getFriendsEvents(){
  this.FriendTray= [];
  const holder = this.prefs;
  const events = this.publicTray;
  console.log(this.publicTray);
  for(var i = 0;i < holder.length;i++){
    const dummy = events.filter(events => events.userId == this.prefs[i].friendOf);
    for(var j = 0; j < dummy.length; j++){
      this.FriendTray.push(dummy[j]);
      // console.log(dummy[j]);
    }
    // console.log(dummy[i].userId);
  }
  // // this.FriendTray = curatedList;
  console.log(this.FriendTray);

  // for(var i = 1;i < this.prefs.length;i++){
  //   const dummy = holder.filter(events => events.userId = this.prefs[i].friendOf);
  //   for(var j = 0; j < dummy.length; j++){
  //     this.FriendTray.push(dummy[j]);
  //     console.log(dummy[j]);
  //   }
  // }  
     
}
  



renderPublic(){
  this.ucCalendar.fullCalendar('removeEvents');
  this.FriendTray.forEach(el => {
    this.ucCalendar.fullCalendar('renderEvent', el); 
  });
  this.ucCalendar.fullCalendar('rerenderEvents');
}
}
