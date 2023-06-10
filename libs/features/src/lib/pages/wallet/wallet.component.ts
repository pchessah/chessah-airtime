import { Component, OnInit } from '@angular/core';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { ITransfer } from 'libs/interfaces/src/lib/transfers/transfers.interface';
import { IUser } from 'libs/interfaces/src/public-api';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthHttpService } from 'libs/state/src/lib/auth/auth.http.service';
import { TransfersService } from 'libs/state/src/lib/transfers/transfers.service';
import { TopUpHttpService } from 'libs/state/src/lib/topup/topup.http.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  styleUrls :["./wallet.component.scss"]
})

export class WalletComponent implements OnInit {
  private _sbs = new SubSink();
  isLoading = true;
  total$!:Observable<number>;
  total: number = 0;
  transfers$!:Observable<ITransfer[]>;
  topUps:ITopup[] = [];
  displayedColumns: string[] = ['date', 'phone', 'amount'];
  users: IUser[] = [];
  currentUser: any;
  
  constructor(private _dialog:MatDialog,
              private _router:Router,
              private _authService: AuthHttpService,
              private _transfersService: TransfersService,
              private _topUpservice:TopUpHttpService) { }

  ngOnInit() { }

  openDialog(type: 'topup' | 'makeTransfer' , total: number = 0){
    const ref = this._dialog.open(AmountFormComponent, {
      width: '550px',
      maxWidth: '95vw',
      data:{type: type, total:total, users:this.users},
      disableClose: true
    });

    this._sbs.sink = 
        ref.afterClosed().pipe(filter(res => !!res)).subscribe(data =>{
          if(type == "topup"){
            this._topUp(data);
          } else if(type =="makeTransfer") {
            this._makeTransfer(data);
          }
        });
  }

  private _makeTransfer(data:{phone:number, email:string, amount:number}){
    this._sbs.sink = 
        this._transfersService.doTransfer(data.amount, {phone:data.phone, email:data.email}).subscribe(res =>{
        })
  }

  private _topUp(data:{phone:number, amount:number}){
    this.isLoading = true;
    this._sbs.sink = 
      this._topUpservice.topUp(data.amount).subscribe(res =>{
       this.total = (res as any).current_balance;
       this.currentUser = { ...this.currentUser, balance: this.total}
       this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }
}