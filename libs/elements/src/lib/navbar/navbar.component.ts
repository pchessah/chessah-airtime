import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHttpService } from "libs/state/src/lib/auth/auth.http.service";

import { SubSink } from "subsink";

@Component({
  selector: "lib-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _sbs = new SubSink();

  userIsLoggedIn: boolean = false;
  isLoading:boolean = true;

  constructor(private _router: Router, private _auth: AuthHttpService) {}

  ngOnInit(): void {
    this.userIsLoggedIn = this._auth.isLoggedIn();
    this.isLoading = false;
  }

  goTo(page: string) {
    page.length
      ? this._router.navigateByUrl("/pages/" + page)
      : this._router.navigateByUrl("/pages");
  }

  logOut() {
    this._auth.logOut();
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }
}
