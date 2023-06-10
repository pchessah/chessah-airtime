import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser, IUser2 } from "libs/interfaces/src/public-api";
import { DEFAULT_ENDPOINT } from "../endpoint";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthHttpService {
  private baseURL: string = DEFAULT_ENDPOINT;

  constructor(private httpClient: HttpClient, private _router:Router) {}

  signUp(userDetails: IUser2) {
    const headers = { "content-type": "application/json" };
    let sub = {
      user : userDetails
    };

    const body = JSON.stringify(sub);
    return this.httpClient
      .post(this.baseURL + "/api/v1/users", body, { headers: headers })
      .subscribe((res) => {
        if((res as any)?.errors?.length > 0){
          alert((res as any).errors.join("\n"));
        } else {
          alert((res as any).message);
          this._router.navigate(["pages/login"]);
        };
      });
  }

  login(email: string, password: string) {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify({ email: email, password: password });
    return this.httpClient
      .post(this.baseURL + "/api/v1/login", body, { headers: headers })
      .subscribe((res) => {
        let userSaved = (res as any).user;
        userSaved.token = (res as any).token;

        alert((res as any).message);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(userSaved));
        this._router.navigateByUrl(`pages/dashboard`);
      });
  }

  logOut() {
    localStorage.removeItem('user')
    this._router.navigate(["pages/login"]);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return !!user && user?.token.length;
  }
}
