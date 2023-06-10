import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { loggedInGuardGuard } from "libs/elements/src/lib/guards/logged-in-guard.guard";
import { WalletComponent } from "./pages/wallet/wallet.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "dashboard", component:DashboardComponent, canActivate:[loggedInGuardGuard]},
  { path: "landing", component: LandingComponent },
  { path: "wallet/:id", component: WalletComponent},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", redirectTo: "/pages/landing", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
