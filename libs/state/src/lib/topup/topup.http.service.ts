import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_ENDPOINT } from '../endpoint';

@Injectable({providedIn: 'root'})

export class TopUpHttpService {

  private baseURL: string = DEFAULT_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  topUp(amount:number){
    const currentUser = JSON.parse(localStorage.getItem("user")!);
    const phone_number = currentUser.phone_number;
    const headers = { "content-type": "application/json", "Authorization": "Bearer " + currentUser.token };
    const body = JSON.stringify({ amount: amount, phone_number: phone_number });
    return this.httpClient
      .post(this.baseURL + "/api/v1/top_ups", body, { headers: headers })
      
  }
  
}