import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DirectionsComponent } from './directions.component';
import { DirectionsFormComponent } from './directions-form/directions-form.component';
import { DirectionsMapComponent } from './directions-map/directions-map.component';
import { GoogleMapsService } from './services/google-maps.service';
import { MAP_PROVIDER } from './services/map-provider';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    {provide: MAP_PROVIDER ,useClass:GoogleMapsService}
  ],
  declarations: [
    DirectionsComponent,
    DirectionsFormComponent,
    DirectionsMapComponent
  ],
  exports:[DirectionsComponent]
})
export class DirectionsModule { }
