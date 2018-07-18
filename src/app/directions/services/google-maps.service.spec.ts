import { TestBed, inject } from '@angular/core/testing';

import { GoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapsService]
    });
    mockGlobalGoogleMapObj();
  });

  it('should be created', inject([GoogleMapsService], (service: GoogleMapsService) => {
    expect(service).toBeTruthy();
  }));

  it('should init map',inject([GoogleMapsService], (service: GoogleMapsService) => {
       var newElement = document.createElement('div');
       service.initMap(newElement);
       expect(service.map).toBeTruthy();
  }));

  it('should plot directions',inject([GoogleMapsService], (service: GoogleMapsService) => {
  
    service.map=new window.google.maps.Map();
    spyOn(service.map,'fitBounds');

    service.plotDirections([
      {"lat":1,"lng":2},
      {"lat":3,"lng":4}
    ]);

    expect(service.map.fitBounds).toHaveBeenCalledTimes(1);
    expect(service.polyline).toBeTruthy();
    expect(service.markers.length).toEqual(2);
}));

/**
 * Mock global google maps obj
 */
function mockGlobalGoogleMapObj(){
  window["google"]={
    "maps":{
       "LatLng":function(){},
       "Map":function(){
         return {
          fitBounds:function(){}
         }
       },
       "Polyline":function(){
         return {
           "setMap":function(){},
           "getPath":function(){ return [
             {"lat":function(){return 1;},"lng":function(){return 2;}},
             {"lat":function(){return 1;},"lng":function(){return 2;}}
            ];
         }}
       },
       "LatLngBounds":function(){
          return {
            "extend":function(){}
        }
       },
       "MapTypeId":{
         ROADMAP : "roadmaptype"
       },
       "Marker":function(){},
      }
  }
}
  
});
