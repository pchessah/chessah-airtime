import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AmountFormComponent } from '../../components/amount-form/amount-form.component';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private _dialog:MatDialog){

  }

  openDialog(type: 'topup' | 'makeTransfer'){
    this._dialog.open(AmountFormComponent, {
      width: '550px',
      maxWidth: '95vw',
      data:{type: type},
      disableClose: true
    })
  }

}
