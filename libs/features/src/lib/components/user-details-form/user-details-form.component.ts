import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "lib-user-details-form",
  templateUrl: "./user-details-form.component.html",
  styleUrls: ["./user-details-form.component.css"],
})
export class UserDetailsFormComponent {

  @Input({ required: true }) sectionUsed: "signup" | "login" = "signup";
  @Output() submitFormEvent: EventEmitter<any> = new EventEmitter();//TODO: add type for form object
 
  title: "Sign Up" | "Log In" = "Sign Up";

  constructor(private _router: Router) {
    this._setUpForm(this.sectionUsed);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['sectionUsed']){
      this.sectionUsed = changes['sectionUsed'].currentValue;
      this._setUpForm(this.sectionUsed);
    }
  }

  private _setUpForm(sectionUsed: "signup" | "login") {
    if (sectionUsed === "signup") {
      this.title = "Sign Up";
    } else if (sectionUsed === "login") {
      this.title = "Log In";
    }
  }

  goTo(page:"signup" | "login"){
    this._router.navigateByUrl(`pages/${page}`);
  }

  submitForm(){
    this.submitFormEvent.emit();
  }
}
