import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { userPref } from '../userPrefs';
import * as firebase from 'firebase';
import { AuthService } from "../auth/auth.service";

@Injectable( )
export class userprefencesService{
constructor(private db: AngularFireDatabase){}
holder = [];


pushFriend(user: string,who:string){
    

};
pushFriendNotification(from: string,to: string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'request',
        startDate: '',
        from: from,
        userId: to,
    });
}
pushNewFriendNotification(sender: string, reciever: string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'Friend Accepted',
        startDate: '',
        from: reciever,
        userId: sender,
    })
}
pushDeclineFriendNotification(sender: string, reciever:string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'Friend declined',
        startDate: '',
        from: sender,
        userId: reciever,
    })
}
Friends = [];

// method gets friends list based on sender id
// for loop loops though 
pushEventToFriends(sender: string,date: string){
    // TODO: remove detector text
    console.log('event detected pushing to friends');
    const add = this.db.list('/notifications')
    const ref =this.db.list('/friends' , ref => ref.orderByChild('userId').equalTo(sender)).valueChanges();
    ref.subscribe(
    (Friends: any[]) => {
        this.Friends = Friends;
    }
    )
     // TODO: remove detector text
    console.log(this.Friends);
   for(var i = 0; i < this.Friends.length ; i++){
       add.push({
        type: 'New event',
        startDate: '',
        from: sender,
        userId: this.Friends[i].userId
       })
   } 


}
}          
 

