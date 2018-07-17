import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsMapComponent } from './directions-map.component';
import { MAP_PROVIDER } from '../services/map-provider';

describe('DirectionsMapComponent', () => {
  let component: DirectionsMapComponent 
  let fixture: ComponentFixture<DirectionsMapComponent>;

  //Mocking map provider
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsMapComponent ],
      providers:[
        {provide:MAP_PROVIDER,useValue:{
            initMap: function(){},
            plotDirections:function(){}
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Check if map init was called
  it('map should be initialized', () => {
    spyOn(component["mapService"],"initMap");
    component.ngOnInit();
    expect(component["mapService"].initMap).toHaveBeenCalledTimes(1);
  });

  //Polylines plotted on mapProvider
  it('polylines should be plotted', () => {
    spyOn(component["mapService"],"plotDirections");
    component.plotDirections([])
    expect(component["mapService"].plotDirections).toHaveBeenCalledTimes(1);
    expect(component["mapService"].plotDirections).toHaveBeenCalledWith([]);
  });
});
