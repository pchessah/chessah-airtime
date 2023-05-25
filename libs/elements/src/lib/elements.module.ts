import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ExternalModule } from 'libs/external/src/public-api';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    ExternalModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class ElementsModule { }
