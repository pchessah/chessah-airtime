import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'libs/state/src/lib/auth/auth.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
  constructor(private _authService: AuthService){

  }

  submitForm(data:any){
    this._authService.signIn(data.email, data.password);
  }

  ngOnDestroy(): void {
    this._authService.destroy();
  }

}
