import { NgModule } from "@angular/core";
import { LandingComponent } from "./pages/landing/landing.component";
import { ExternalModule } from "libs/external/src/public-api";
import { FeaturesRoutingModule } from "./features.routing.module";
import { UserDetailsFormComponent } from "./components/user-details-form/user-details-form.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AmountFormComponent } from "./components/amount-form/amount-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WalletComponent } from "./pages/wallet/wallet.component";
@NgModule({
  declarations: [
    LandingComponent,
    UserDetailsFormComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    AmountFormComponent,
    WalletComponent
  ],
  imports: [CommonModule, ExternalModule, FeaturesRoutingModule, FormsModule, ReactiveFormsModule],

  exports: [
    LandingComponent,
    UserDetailsFormComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    AmountFormComponent,
    WalletComponent
  ],
})
export class FeaturesModule {}
