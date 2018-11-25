import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { userPref } from '../userPrefs';
import * as firebase from 'firebase';
import { AuthService } from "../auth/auth.service";

@Injectable( )
export class userprefencesService{
constructor(private db: AngularFireDatabase){}
holder = [];

prefCheck(username: string){
    
    const refs = this.db.list('/friends');
    const ref = firebase.database().ref('/friends');
    ref.orderByChild('userId').equalTo(username).once('value', function(snapshot) {
        console.log(snapshot.exists());
        if(snapshot.exists() == false){
            refs.push({
                userId: username,
                friendsOf: "nothing"
            });
            
        }else{}
    });
}
    pushFriend(user: string,who:string){


    };
           
 
}
