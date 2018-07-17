import { Component, OnInit, ViewChild, Input, SimpleChanges, SimpleChange, Inject } from '@angular/core';
import { GoogleMapsService } from '../services/google-maps.service';
import { MapProvider, MAP_PROVIDER } from '../services/map-provider';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.css']
})
export class DirectionsMapComponent implements OnInit {

  /**
   * KEY for input path prop.
   */
  PATH_PROP_NAME:string = "path";

  /**
   * Path array for coordinates
   */
  @Input("path") path:string[];

  /**
   * Google map div element.
   */
  @ViewChild('gmap') gmapElement: any;

  constructor(@Inject(MAP_PROVIDER) private mapService:MapProvider){
  }

  /**
   * Detect if there are changes in input properties.
   * @param changes Changes
   */
  ngOnChanges(changes: SimpleChanges) {
      var pathChange:SimpleChange = changes[this.PATH_PROP_NAME];
      if(pathChange && pathChange.currentValue){
        this.plotDirections(pathChange.currentValue);
      }
  }

  /**
   * Iniiiates map.
   */
  ngOnInit() {
    this.mapService.initMap(this.gmapElement.nativeElement);
  }

  /**
   * Plots given points on map
   * @param directions array of coordinates
   */
  public plotDirections(directions: any[]) {
    var latLngs = directions.map((el) => {
      return { "lat": Number(el[0]), "lng": Number(el[1]) }
    });

    this.mapService.plotDirections(latLngs);

  }

}
