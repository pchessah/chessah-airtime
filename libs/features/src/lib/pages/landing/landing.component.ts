import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "libs/state/src/lib/auth/auth.service";
import { SubSink } from "subsink";

@Component({
  selector: "lib-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit, OnDestroy {
  private _sbs = new SubSink();
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this._sbs.sink = this._authService.userAuthStatus().subscribe((user) => {
      this.isLoggedIn = user.email.length > 0;
      this.isLoading = false;
    });
  }

  goTo(page: "signup" | "login" | "dashboard") {
    this._router.navigateByUrl("/pages/" + page);
  }

  ngOnDestroy(): void {
    this._sbs.unsubscribe();
  }
}
