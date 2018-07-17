import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DirectionsModule } from './directions/directions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    DirectionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
