import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { filter, switchMap } from 'rxjs/operators';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { IUser } from 'libs/interfaces/src/public-api';

@Injectable({providedIn: 'root'})

export class TopUpService {

  constructor(private db: AngularFirestore, private _authService:AuthService) { }

  //Gets the list of topups of the user, reduces them total
  //Doing this to account for -topup which simulates money transfer;
  getAmountOfUser(){
    return this._authService.userAuthStatus().pipe(filter(user => !!user),switchMap(user => {
      return this.db.collection(`users/${user?.uid}/topups`).valueChanges();
    }));
  }

  //Top up current user
  topUpAmountOfUser(amount:number){
    return this._authService.userAuthStatus().pipe(filter(user => !!user),switchMap(user => {
      const topUp:ITopup = {
        amount: amount,
        timeStamp: new Date(),
        id:String(new Date().getTime())
      }
      return this._addTopUpToDb(user, topUp);
    }))
  }

  //Transfer of money functionality
  topUpAmountOfOtherUser(user:IUser, amount:number) {
    const topUp:ITopup = {
      amount: amount,
      timeStamp: new Date(),
      id:String(new Date().getTime())
    }
    return this._addTopUpToDb(user, topUp);
  }

  private _addTopUpToDb(user:IUser, topUp:ITopup){
    return this.db.collection(`users/${user?.uid}/topups`).doc(topUp.id).set(topUp)
  }
  
}


