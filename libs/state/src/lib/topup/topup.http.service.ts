import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class TopUpHttpService {

  constructor(private httpClient: HttpClient) { }
  
}