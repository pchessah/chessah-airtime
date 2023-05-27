import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "../auth/auth.service";
import { filter, map, switchMap } from "rxjs/operators";
import { TopUpService } from "../topup/topup.service";
import { IUser } from "libs/interfaces/src/public-api";
import { combineLatest } from "rxjs";
import { ITransfer } from "libs/interfaces/src/lib/transfers/transfers.interface";

@Injectable({ providedIn: "root" })
export class TransfersService {
  constructor(
    private db: AngularFirestore,
    private _authService: AuthService,
    private _topUpservice: TopUpService
  ) {}

  getTransfers(){
    return this._authService.userAuthStatus().pipe(switchMap(user =>{
      return  this.db.collection(`users/${user?.uid}/transfers`).valueChanges();
    }))
  }

  getUsers (){
    return this._authService.getUsers()
  }

  doTransfer(amount: number, recepient: { phone: number; email: string }) {
    //Get list of all users
    return this._authService.getUsers().pipe(
      filter((res) => !!res),

      //Find recepient using phone or email
      map((users) => {
        if(users?.length > 0) {
          const user = users.find(
            (u: IUser) =>
              u.email === recepient.email || u.phone === recepient.phone
          );
          if (!user) {
            return;
          }
          return user;
        }
      }),
      filter((res) => !!res),

      //Add amount to recepient
      switchMap((otherUser) => {
        const topUpOtherUser$ = this._topUpservice.topUpAmountOfOtherUser(
          otherUser,
          amount
        );

        //Remove amount from sender
        const topUpUser$ = this._topUpservice.topUpAmountOfUser(-amount);

        return combineLatest([topUpOtherUser$, topUpUser$]);
      }),

     
      //Get current user
      switchMap((res) => {
        return this._authService.userAuthStatus();
      }),

      //Add transfer object
      switchMap((user) => {
        const transfer:ITransfer = {
          recepientPhone: recepient.phone,
          recepientEmail: recepient.email,
          amount: amount,
          id: String(new Date().getTime()),
          timeStamp: new Date()
        };
        return this.db.collection(`users/${user?.uid}/transfers`).doc(transfer.id).set(transfer);
      })
    );
  }
}
