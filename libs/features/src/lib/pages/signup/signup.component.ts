import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'libs/state/src/lib/auth/auth.service';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private _authService:AuthService){
  }

  submitForm(data:any){
    this._authService.signUp(data.email, data.password)
  }
  

}
