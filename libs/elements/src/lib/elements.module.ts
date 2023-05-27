import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ExternalModule } from 'libs/external/src/public-api';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ExternalModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class ElementsModule { }
