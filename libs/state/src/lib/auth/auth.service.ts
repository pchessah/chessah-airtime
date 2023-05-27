import { Injectable, NgZone } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { IUser } from "libs/interfaces/src/public-api";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user")!);
      } else {
        localStorage.setItem("user", "null");
        JSON.parse(localStorage.getItem("user")!);
      }
    });
  }

  addUserToLocalStorage(user:any){
    this.userData = user;
    localStorage.setItem("user", JSON.stringify(this.userData));
    JSON.parse(localStorage.getItem("user")!);
  }

  userAuthStatus(): Observable<any> {
    return this.afAuth.authState.pipe(switchMap(user => {
      return this.afs.doc(`users/${user?.uid}`).valueChanges();
    }));
  }

  getUsers(): Observable<any> {
    return this.afs.collection(`users`).valueChanges();
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.addUserToLocalStorage(user)
            this.router.navigateByUrl(`pages/dashboard`);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string, phone: number) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user, phone);
        this.addUserToLocalStorage(result.user)
        window.alert("Sign Up Success, Logging you in...");
        this.router.navigateByUrl(`pages/dashboard`);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return (user !== null) !== false ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any, phone: number) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phone: phone,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["pages/login"]);
    });
  }
}
