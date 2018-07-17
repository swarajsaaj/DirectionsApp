import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {  Component } from '@angular/core';
import { DirectionsService } from './core/services/directions.service';
import { Observable } from 'rxjs';
import { DirectionsComponent } from './directions/directions.component';

describe('AppComponent', () => {
 
  let fixture:ComponentFixture<AppComponent>;
  let component:AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DirectionsCompStub
      ],
      providers:[
        {provide:DirectionsComponent,useClass:DirectionsCompStub}
      ],
      imports: [
        NgHttpLoaderModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  @Component({selector: 'app-directions', template: ''})
  class DirectionsCompStub {
  
  }

});