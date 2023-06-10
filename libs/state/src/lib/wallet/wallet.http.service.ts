import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DEFAULT_ENDPOINT } from '../endpoint';
import { AuthHttpService } from '../auth/auth.http.service';

@Injectable({providedIn: 'root'})

export class WalletService {
  private baseURL: string = DEFAULT_ENDPOINT;

  constructor(private httpClient: HttpClient, private _authHttpService:AuthHttpService) { }

  getWalletsOfUser(){
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify({ test: true });
    return this.httpClient
      .post(this.baseURL + "/api/v1/login", body, { headers: headers }).pipe(catchError(err =>{
        return of(err);
      }));
  };

  topUpWalletOfUser(amount: number, wallet_id:any){
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify({ amount: amount, wallet_id: wallet_id });
    return this.httpClient
      .post(this.baseURL + "/api/v1/login", body, { headers: headers }).pipe(catchError(err =>{
        return of(err);
      }));
  };
  
}