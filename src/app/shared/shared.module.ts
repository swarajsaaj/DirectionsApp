import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from '../../../node_modules/ng-http-loader';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { GooglePlaceModule } from '../../../node_modules/ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports:[
    NgHttpLoaderModule,
    FormsModule,
    GooglePlaceModule]
})
export class SharedModule { }
