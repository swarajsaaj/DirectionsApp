import { Injectable } from '@angular/core';

import { } from 'googlemaps';
import { MapProvider } from './map-provider';

/**
 * Implementation of Google maps provider
 */
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService implements MapProvider {

  constructor() { }

 /**
   * Google map instance.
   */
  map: google.maps.Map;
  
  /**
   * Start location label.
   */
  START_PT_LABEL: string = "Starting Point";

  /**
   * End location label.
   */
  END_PT_LABEL: string = "Dropoff Point";

  /**
   * Markers added to map
   */
  markers:google.maps.Marker[]=[];

  /**
   * Polylines added to map
   */
  polyline:google.maps.Polyline;

  /**
   * Init map in native element.
   * @param element native element
   */
  initMap(element:Element){
    var mapProp = {
      center: new google.maps.LatLng(22.372081, 114.107877),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(element, mapProp);
  }

  /**
   * Plot directions on map instance.
   * @param latLngs latitude longitude array
   */
  plotDirections(latLngs:any[]){

    this.clearMarkers();
    this.clearPolylines();

    var path = new google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor: '#0011FF',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    path.setMap(this.map);
    this.polyline=path;

    var bounds = new google.maps.LatLngBounds();
    path.getPath().forEach(function (item, index) {
      bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
    });

    this.addMarker(this.map, latLngs[0], this.START_PT_LABEL);

    this.addMarker(this.map, latLngs[latLngs.length - 1], this.END_PT_LABEL);

    this.map.fitBounds(bounds);

  }

  /**
   * Adds a marker for given lat-long on map instance.
   * @param map 
   * @param latLng 
   * @param title 
   */
  addMarker(map: google.maps.Map, latLng: any, title: string) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: title
    });
    this.markers.push(marker);
  }

  /**
   * Clears all markers on map.
   */
  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers=[]
  }

  /**
   * Clears all polylines on map
   */
  clearPolylines(){
    if(this.polyline){
      this.polyline.setMap(null)
    }
  }

}
