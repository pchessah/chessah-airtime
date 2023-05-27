import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';
import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { TopUpService } from 'libs/state/src/lib/topup/topup.service';
import { Observable } from 'rxjs';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { TransfersService } from 'libs/state/src/lib/transfers/transfers.service';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  private _sbs = new SubSink();
  isLoading = true;
  total$!:Observable<number>
  topUps:ITopup[] = [];

  constructor(private _dialog:MatDialog,
              private _transfersService: TransfersService,
              private _topUpservice:TopUpService){ }

  ngOnInit(): void {
    this.total$ = this._topUpservice.getAmountOfUser().pipe(map(res => {
      this.topUps = res as any;
      const total = this.topUps.map(t => t.amount).reduce((a,b) => a + b, 0);
      this.isLoading = false;
      return total;
    }))
  }

  openDialog(type: 'topup' | 'makeTransfer' , total: number = 0){
    const ref = this._dialog.open(AmountFormComponent, {
      width: '550px',
      maxWidth: '95vw',
      data:{type: type, total:total},
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
    this.isLoading = true;
    this._sbs.sink = 
        this._transfersService.doTransfer(data.amount, {phone:data.phone, email:data.email}).subscribe(res =>{
          this.isLoading = false;
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
