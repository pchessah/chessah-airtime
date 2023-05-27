import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { TopUpService } from 'libs/state/src/lib/topup/topup.service';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { TransfersService } from 'libs/state/src/lib/transfers/transfers.service';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';
import { ITransfer } from 'libs/interfaces/src/lib/transfers/transfers.interface';
import { IUser } from 'libs/interfaces/src/public-api';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  private _sbs = new SubSink();
  isLoading = true;
  total$!:Observable<number>;
  transfers$!:Observable<ITransfer[]>;
  topUps:ITopup[] = [];
  displayedColumns: string[] = ['date', 'phone', 'amount'];
  users: IUser[] = [];

  constructor(private _dialog:MatDialog,
              private _transfersService: TransfersService,
              private _topUpservice:TopUpService){ }

  ngOnInit(): void {
    this.total$ = this._topUpservice.getAmountOfUser().pipe(map(res => {
      this.topUps = res as any;
      const total = this.topUps.map(t => t.amount).reduce((a,b) => a + b, 0);
      this.isLoading = false;
      return total;
    }));

    this.transfers$ = this._transfersService.getTransfers().pipe(map((transfers) =>{
      return transfers.map(t => {
        const formattedTransfer = {
          date: new Date((t as any).timeStamp.seconds * 1000).toLocaleDateString(),
          contact: (t as any)?.recepientPhone ?? (t as any)?.recepientEmail,
          amount: (t as any)?.amount
        }
        return formattedTransfer as any;
      });
    }));

    this._sbs.sink = this._transfersService.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

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
      this._topUpservice.topUpAmountOfUser(data.amount).subscribe(res =>{
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }

}
