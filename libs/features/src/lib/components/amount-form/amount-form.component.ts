import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "libs/state/src/lib/auth/auth.service";
import { filter, switchMap } from "rxjs/operators";
import { SubSink } from "subsink";

@Component({
  selector: "lib-amount-form",
  templateUrl: "./amount-form.component.html",
  styleUrls: ["./amount-form.component.css"],
})
export class AmountFormComponent {
  isLoading = true;
  private _sbs = new SubSink();
  type: "topup" | "makeTransfer" = "topup";
  title: string = "Top Up Account";
  transferMode: "email" | "phone" = "phone";
  amountForm!: FormGroup;
  currentUser: any;
  total: number = 0;
  cannotMakeTransfer: boolean = false;
  sameUserError: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { type: "topup" | "makeTransfer"; total: number },
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AmountFormComponent>
  ) {
    this._sbs.sink = this._authService
      .userAuthStatus()
      .pipe(
        filter((res) => !!res),
        switchMap((user) => {
          this.currentUser = user;
          this.type = data.type;
          this.total = data.total;
          this._setUpForm(data.type);
          this.isLoading = false;
          return this.amountForm.valueChanges;
        })
      )
      .subscribe((formVals) => {
        this.cannotMakeTransfer =
          formVals.amount > this.total && this.type === "makeTransfer";
        this.sameUserError =
          (formVals.phone === this.currentUser.phone ||
            formVals.email === this.currentUser.email) &&
          this.type === "makeTransfer";
      });
  }

  private _setUpForm(type: "topup" | "makeTransfer") {
    if (type === "topup") {
      this.title = "Top Up Account";
      this.amountForm = this._fb.group({
        phone: [this.currentUser.phone, Validators.required],
        amount: ["", Validators.required],
      });
    } else if (type === "makeTransfer") {
      this.title = "Make Transfer";
      this.amountForm = this._fb.group({
        phone: [this.currentUser.phone, Validators.required],
        amount: ["", Validators.required],
        email: [
          this.currentUser.email,
          [
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$"),
          ],
        ],
      });
      this._updateValidators(this.transferMode);
    }
  }

  getImageSrc() {
    if (this.type === "topup") {
      return "assets/transfer.svg";
    } else if ((this.type = "makeTransfer")) {
      return "assets/landing.svg";
    }
    return "";
  }

  private _updateValidators(transferMode: "email" | "phone") {
    if (transferMode === "email") {
      this.amountForm.controls["email"].setValidators([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$"),
      ]);
      this.amountForm.controls["phone"].clearValidators();
    } else if (this.transferMode === "phone") {
      this.amountForm.controls["phone"].setValidators(Validators.required);
      this.amountForm.controls["email"].clearValidators();
    }
    this.amountForm.controls["email"].reset();
    this.amountForm.controls["email"].updateValueAndValidity();

    this.amountForm.controls["phone"].reset();
    this.amountForm.controls["phone"].updateValueAndValidity();

    this.amountForm.updateValueAndValidity();
  }

  changeTransferMode(event: any) {
    this.transferMode = event.value;
    this._updateValidators(this.transferMode);
  }

  close(data = null) {
    this._dialogRef.close(data);
  }
}
