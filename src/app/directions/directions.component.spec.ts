import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsComponent } from './directions.component';
import { Component, Input } from '../../../node_modules/@angular/core';
import { DirectionsService } from '../core/services/directions.service';
import { Observable } from '../../../node_modules/rxjs';
import { NgHttpLoaderModule } from '../../../node_modules/ng-http-loader';

describe('DirectionsComponent', () => {
  let component: DirectionsComponent;
  let fixture: ComponentFixture<DirectionsComponent>;
  
  let tokenApiResponse = {
    path:[["12","21"],["23","34"]],
    total_time:200,
    total_distance:100
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DirectionsComponent,
        FormStub,
        MapStub
      ],
      providers:[
        {provide:DirectionsService,useValue:{
          getRoute: function(){
            return new Observable((observer)=>{
                observer.next(tokenApiResponse)
                observer.complete();
            })
          }
        }}
      ],
      imports: [
        NgHttpLoaderModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectionsComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get route from token',()=>{
    fixture.componentInstance.itinerarySubmitted("token")
    expect(fixture.componentInstance.path).toBe(tokenApiResponse.path);
    expect(fixture.componentInstance.routeParams.duration).toBe(tokenApiResponse.total_time);
    expect(fixture.componentInstance.routeParams.distance).toBe(tokenApiResponse.total_distance);
    
  })
});

/**
 * Stub component for DirectionsFormComponent
 */
@Component({selector: 'app-directions-form', template: ''})
class FormStub {
  @Input("routeParams") routeParams:any;
  populateDistanceData(){

  }
 }

 /**
 * Stub component for DirectionsMapComponent
 */
@Component({selector: 'app-directions-map', template: ''})
class MapStub {
  @Input("path") path:any;
  plotDirections(){

  }
}
