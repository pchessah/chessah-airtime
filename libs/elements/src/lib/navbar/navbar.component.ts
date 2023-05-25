import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private _router:Router){

  }

  goTo(page: string){
    page.length ? this._router.navigateByUrl("/pages/"+page) : this._router.navigateByUrl("/pages");
  }


}
