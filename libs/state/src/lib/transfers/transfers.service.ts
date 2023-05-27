import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "../auth/auth.service";
import { filter, map, switchMap } from "rxjs/operators";
import { TopUpService } from "../topup/topup.service";
import { IUser } from "libs/interfaces/src/public-api";
import { combineLatest } from "rxjs";

@Injectable({ providedIn: "root" })

export class TransfersService {
  constructor(
    private db: AngularFirestore,
    private _authService: AuthService,
    private _topUpservice: TopUpService
  ) {}

  doTransfer(amount: number, recepient: { phone: number; email: string }) {
    return this._authService.getUsers().pipe(
      map((users) => {
        const user = users.find(
          (u: IUser) =>
            u.email === recepient.email || u.phone === recepient.phone
        );
        if(!user){
          window.alert("User does not exist, cannot make transfer.")
          return;
        }
        return user;
      }),
      filter((res) => !!res),
      switchMap((otherUser) => {
        const topUpOtherUser$ = this._topUpservice.topUpAmountOfOtherUser(
          otherUser,
          amount
        );
        const topUpUser$ = this._topUpservice.topUpAmountOfUser(-amount);

        return combineLatest([topUpOtherUser$, topUpUser$]);
      }),

      switchMap((res) => {
        return this._authService.userAuthStatus();
      }),
      switchMap((user) => {
        const transfer = {
          phone: recepient.phone,
          email: recepient.email,
          amount: amount,
        };
        return this.db.collection(`users/${user?.uid}/transfers`).add(transfer);
      })
    );
  }
}
