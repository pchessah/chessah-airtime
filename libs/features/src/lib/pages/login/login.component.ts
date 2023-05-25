import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _router:Router){

  }

  submitForm(data:any){
    this._router.navigateByUrl(`pages/dashboard`);
  }

}
