import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { userprefencesService } from '../db/userprefences.service';
@Injectable()
export class AuthService{
    userName: string;
    token: string;
    
    constructor(private router: Router, private userP: userprefencesService){

    }
    signupUser(email: string,password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }
    
    logInUser(email: string,password: string){
        firebase.auth().signInWithEmailAndPassword(email , password)
        // TODO what is the response that is displayed in the terminal
        .then(
            response => {
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                )
                console.log(response)
                this.userName = response.user.email;
                console.log(this.userName);
                this.router.navigate(['/Dashboard']);
            }
            
        )
        .catch(
            error => console.log(error)
        )
       
        console.log('LogInUser Called');
    }
    logInWithGoogle(){
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then((result) => {
            
            firebase.auth().currentUser.getIdToken()
            .then(
                
                (token: string) => this.token = token,
            )
            
            this.userName = result.user.email;
            this.router.navigate(['/Dashboard']);
            console.log(this.token);
        }).catch((error) => {
            console.log(error);
        })
    }
    logInWithGithub(){
        const githubProvider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(githubProvider).then((result) => {
            
            firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            )
            console.log(result);
            this.userName = result.user.email;
            this.router.navigate(['/Dashboard']);
            console.log(this.token);
        }).catch((error) => {
            console.log(error);
        })
    }
    // async action
    getToken(){
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        );
        // Error handleing here
        console.log(this.token);
        return this.token;
    }
    // Token check
    isAuthenticated(){
        return this.token != null;
    }
    // logs the user out, destroys and reset the token
    logout(){
        firebase.auth().signOut();
        this.token = null;
        console.log('user Logged out');
        this.router.navigate(['LogSign']);
    }
}