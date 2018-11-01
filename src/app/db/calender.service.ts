import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";



@Injectable( )
export class calenderService{
constructor(private http: Http, private AuthService: AuthService){}
// Storing objects from character
storeEvents(Events: any){
    const token = this.AuthService.getToken()
    // Will only create a observable object and does not send to anything
    // data.json tells firebase that we are using the data
    // return this.http.post('https://fatetools.firebaseio.com/data.json',Characters);
    // For firebase this allows for data to be overwritten 
    return this.http.put('https://capstone-24a83.firebaseio.com/events.json?auth=' + token,Events);
}
// This method creates an observable object that will be used to get new data from the database
getEvents(){
    const token = this.AuthService.getToken();
    console.log(token);
    return this.http.get('https://capstone-24a83.firebaseio.com/events.json?auth=' + token)
    // The map operator will take the data and wrap it into an new observable
    .pipe(map(
        (response:Response) => {
            const data = response.json();
            return data;
        }
    ))
}
}