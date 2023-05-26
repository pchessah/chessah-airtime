import { Component, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  private _dialog$!:Subscription;

  constructor(private _dialog:MatDialog){

  }

  openDialog(type: 'topup' | 'makeTransfer'){
    const ref = this._dialog.open(AmountFormComponent, {
      width: '550px',
      maxWidth: '95vw',
      data:{type: type},
      disableClose: true
    });

    this._dialog$ = ref.afterClosed().pipe(filter(res => !!res)).subscribe(data =>{
      debugger
    })


  }


  ngOnDestroy(): void {
      
  }

}
