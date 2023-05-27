import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';
import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { TopUpService } from 'libs/state/src/lib/topup/topup.service';
import { Observable } from 'rxjs';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';

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
              private _topUpservice:TopUpService){ }

  ngOnInit(): void {
    this.total$ = this._topUpservice.getAmountOfUser().pipe(map(res => {
      this.topUps = res as any;
      const total = this.topUps.map(t => t.amount).reduce((a,b) => a + b, 0);
      this.isLoading = false;
      return total;
    }))
  }


  openDialog(type: 'topup' | 'makeTransfer'){
    const ref = this._dialog.open(AmountFormComponent, {
      width: '550px',
      maxWidth: '95vw',
      data:{type: type},
      disableClose: true
    });

    this._sbs.sink = 
        ref.afterClosed().pipe(filter(res => !!res)).subscribe(data =>{
          if(type == "topup"){
            this._topUp(data);
          }
        });
  }

  private _topUp(data:{phone:number, amount:number}){
    this.isLoading = false;
    this._topUpservice.topUpAmountOfUser(data.amount).subscribe(res =>{
      this.isLoading = true;
    });
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }

}
