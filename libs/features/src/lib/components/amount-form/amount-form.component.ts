import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-amount-form',
  templateUrl: './amount-form.component.html',
  styleUrls: ['./amount-form.component.css']
})
export class AmountFormComponent {

  type: 'topup' | 'makeTransfer';
  title: string = "Top Up Account";
  transferMode: 'email' | 'phone' = 'phone';

  constructor(@Inject(MAT_DIALOG_DATA) data:{type:'topup' | 'makeTransfer'},
               private _dialogRef: MatDialogRef<AmountFormComponent>){
    this.type = data.type;
    this._setUpForm(data.type);
  }

  private _setUpForm(type: 'topup' | 'makeTransfer'){
    if(type === "topup"){
      this.title =  "Top Up Account";
    } else if(type === "makeTransfer"){
      this.title = "Make Transfer";
    }
  }

  getImageSrc(){
    if(this.type === "topup"){
      return 'assets/transfer.svg';
    } else if(this.type = "makeTransfer"){
      return 'assets/landing.svg';
    }
    return ""
  }

  changeTransferMode(event:any){
    this.transferMode = event.value;
  }

  close(){
    this._dialogRef.close();
  }

}
