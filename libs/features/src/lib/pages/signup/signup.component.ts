import { Component } from '@angular/core';
import { IUser2 } from 'libs/interfaces/src/public-api';
import { AuthHttpService } from 'libs/state/src/lib/auth/auth.http.service';

@Component({
  selector: 'lib-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private _authService:AuthHttpService){
  }

  submitForm(data:any){
    const signUpdetails:IUser2 = {
      first_name : data.first_name,
      last_name : data.last_name,
      password: data.password,
      password_confirmation: data.password_confirmation,
      email: data.email,
      phone_number: data.phone_number,
      role: "client",
      currency: data.currency
    };

    this._authService.signUp(signUpdetails);
  }
  

}
