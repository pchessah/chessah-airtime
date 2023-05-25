import { NgModule } from "@angular/core";
import { LandingComponent } from "./pages/landing/landing.component";
import { ExternalModule } from "libs/external/src/public-api";
import { FeaturesRoutingModule } from "./features.routing.module";
import { UserDetailsFormComponent } from "./components/user-details-form/user-details-form.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [LandingComponent, UserDetailsFormComponent, SignupComponent, LoginComponent],
  imports: [CommonModule,ExternalModule, FeaturesRoutingModule],
  exports: [LandingComponent, UserDetailsFormComponent, SignupComponent, LoginComponent],
})
export class FeaturesModule {}
