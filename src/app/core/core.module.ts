import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from '../shared/shared.module';
import { DirectionsService } from './services/directions.service';

@NgModule({
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    GooglePlaceModule,
    NgHttpLoaderModule,
  ]
})
export class CoreModule { }
