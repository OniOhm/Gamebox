import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";


@Injectable( )
export class userprefencesService{
constructor(private db: AngularFireDatabase){}
holder = [];
friends: any[];


// Friend notifications
pushFriendNotification(from: string,to: string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'Friend request',
        startDate: '',
        title: '',
        from: from,
        userId: to,
    });
}
pushNewFriendNotification(sender: string, reciever: string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'Friend Accepted',
        startDate: '',
        title: '',
        from: reciever,
        userId: sender,
    })
}
pushDeclineFriendNotification(sender: string, reciever:string){
    const ref = this.db.list('/notifications');
    ref.push({
        type: 'Friend declined',
        startDate: '',
        title: '',
        from: sender,
        userId: reciever,
    })
}

// Event notifications
// methods gets friends list based on sender id
// for loop loops though 
// Need to populate array on init of component
pushEventToFriends(sender: string,friends: any[],title: string){

    const add = this.db.list('/notifications');
    friends.forEach(function(el){
        add.push({
            type: 'New event',
            startDate: '',
            title: title,
            from: sender,
            userId: el.userId
        });
    })

} 
pushUpdatedEventToFriends(sender:string ,friends: any[],title: string){
    const add = this.db.list('/notifications');
    friends.forEach(function(el){
        add.push({
            type: 'Event updated',
            startDate: '',
            title: title,
            from: sender,
            userId: el.userId
        });
    })
}
pushDeletedEventToFriends(sender:string ,friends: any[],title: string){
    // Todo: remove test text
    console.log('method called removing events');
    const add = this.db.list('/notifications');
    friends.forEach(function(el){
        add.push({
            type: 'Event deleted',
            startDate: '',
            title: title,
            from: sender,
            userId: el.userId
        });
    })
}
pushDeletedFriend(sender:string,reciver:string){
    const add = this.db.list('/notifications');
        add.push({
            type: 'Friend removed',
            startDate: '',
            title: '',
            from: sender,
            userId: reciver
        });
    }
}

         
 

