import { Component, OnDestroy } from '@angular/core';
import { AuthHttpService } from 'libs/state/src/lib/auth/auth.http.service';
import { AuthService } from 'libs/state/src/lib/auth/auth.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  constructor(private _authService: AuthHttpService){

  }

  submitForm(data:any){
    this._authService.login(data.email, data.password);
  }

  // ngOnDestroy(): void {
  //   this._authService.destroy();
  // }

}
