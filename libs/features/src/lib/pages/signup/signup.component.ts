import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private _router:Router){
  }

  submitForm(data:any){
    debugger
    this._router.navigateByUrl(`pages/dashboard`);
  }
  

}
