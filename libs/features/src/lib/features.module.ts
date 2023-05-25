import { NgModule } from '@angular/core';
import { LandingComponent } from './pages/landing/landing.component';
import { ExternalModule } from 'libs/external/src/public-api';
import { FeaturesRoutingModule } from './features.routing.module';




@NgModule({
  declarations: [LandingComponent
    
  ],
  imports: [
    ExternalModule,
    FeaturesRoutingModule
  ],
  exports: [LandingComponent
    
  ]
})
export class FeaturesModule { }
