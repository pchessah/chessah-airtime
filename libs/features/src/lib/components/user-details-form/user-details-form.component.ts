import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "lib-user-details-form",
  templateUrl: "./user-details-form.component.html",
  styleUrls: ["./user-details-form.component.css"],
})
export class UserDetailsFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input({ required: true }) sectionUsed: "signup" | "login" = "signup";
  @Output() submitFormEvent: EventEmitter<any> = new EventEmitter();

  title: "Sign Up" | "Log In" = "Sign Up";
  userDetailsForm!: FormGroup;
  userDetailsFormValue$!: Subscription;
  passwordErr: string = "";

  constructor(private _router: Router, private _fb: FormBuilder) {
    this._setUpForm(this.sectionUsed);
  }

  ngOnInit(): void {
    this.userDetailsFormValue$ = this.userDetailsForm.valueChanges.subscribe(
      (vals) => {
        if (vals.password.length > 0 && this.sectionUsed == "signup") {
          if (vals.password !== vals.password2) {
            this.userDetailsForm.controls["password"].setErrors({
              incorrect: true,
            });
            this.userDetailsForm.controls["password2"].setErrors({
              incorrect: true,
            });
            this.passwordErr = "Passwords do not match.";
          } else {
            this.userDetailsForm.controls["password"].setErrors(null);
            this.userDetailsForm.controls["password2"].setErrors(null);
            this.passwordErr = "";
          }
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["sectionUsed"]) {
      this.sectionUsed = changes["sectionUsed"].currentValue;
      this._setUpForm(this.sectionUsed);
    }
  }

  private _setUpForm(sectionUsed: "signup" | "login") {
    if (sectionUsed === "signup") {
      this.title = "Sign Up";
      this.userDetailsForm = this._fb.group({
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$"),
          ],
        ],
        phone: ["", [Validators.required]],
        password: ["", [Validators.required]],
        password2: ["", [Validators.required]],
      });
    } else if (sectionUsed === "login") {
      this.title = "Log In";
      this.userDetailsForm = this._fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
      });
    }
  }

  fieldIsInvalid(control: string) {
    return (
      !!this.userDetailsForm?.controls[control]?.invalid &&
      !!this.userDetailsForm?.controls[control]?.touched
    );
  }

  goTo(page: "signup" | "login") {
    this._router.navigateByUrl(`pages/${page}`);
  }

  submitForm() {
    const currentValue = this.userDetailsForm.value;
    this.submitFormEvent.emit(currentValue);
  }

  ngOnDestroy(): void {
    this.userDetailsFormValue$.unsubscribe();
  }
}
