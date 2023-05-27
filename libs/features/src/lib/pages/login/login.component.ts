import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'libs/state/src/lib/auth/auth.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authService: AuthService){

  }

  submitForm(data:any){
    this._authService.signIn(data.email, data.password);
  }

}
