import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private _router:Router){

  }

  goTo(page: "signup" | "login"){
    this._router.navigateByUrl("/pages/"+page);
  }

}
