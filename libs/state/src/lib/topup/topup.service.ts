import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { filter, switchMap } from 'rxjs/operators';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { IUser } from 'libs/interfaces/src/public-api';

@Injectable({providedIn: 'root'})

export class TopUpService {

  constructor(private db: AngularFirestore, private _authService:AuthService) { }

  getAmountOfUser(){
    return this._authService.userAuthStatus().pipe(filter(user => !!user),switchMap(user => {
      return this.db.collection(`users/${user?.uid}/topups`).valueChanges();
    }));
  }

  topUpAmountOfUser(amount:number){
    return this._authService.userAuthStatus().pipe(filter(user => !!user),switchMap(user => {
      const topUp:ITopup = {
        amount: amount,
        time: new Date()
      }
      return this.db.collection(`users/${user?.uid}/topups`).add(topUp);
    }))
  }

  topUpAmountOfOtherUser(user:IUser, amount:number) {
    const topUp:ITopup = {
      amount: amount,
      time: new Date()
    }
    return this.db.collection(`users/${user?.uid}/topups`).add(topUp);
  }
  
}