import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ITopup } from 'libs/interfaces/src/lib/transfers/topup.interface';
import { ITransfer } from 'libs/interfaces/src/lib/transfers/transfers.interface';
import { IUser } from 'libs/interfaces/src/public-api';
import { AuthHttpService } from 'libs/state/src/lib/auth/auth.http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  private _sbs = new SubSink();
  isLoading = true;
  total$!:Observable<number>;
  total: number = 0;
  transfers$!:Observable<ITransfer[]>;
  topUps:ITopup[] = [];
  displayedColumns: string[] = ['date', 'phone', 'amount'];
  users: IUser[] = [];
  currentUser: any;

  constructor(private _router:Router,
              private _authService: AuthHttpService){ }

  ngOnInit(): void {

    this.currentUser = this._authService.getCurrentUser();
    this.isLoading = false;
  }

  openWallet(){
    this._router.navigate(['pages/wallet/3'])
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }

}
