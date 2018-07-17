import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import {DirectionsService} from '../../core/services/directions.service';
import { RouteResponse } from '../models/route-response';

@Component({
  selector: 'app-directions-form',
  templateUrl: './directions-form.component.html',
  styleUrls: ['./directions-form.component.css']
})
export class DirectionsFormComponent implements OnInit {

  /**
   * Route data for exposing duration,time to DOM
   */
  @Input("routeParams") routeParams:RouteResponse;

  /**
   * EventEmitter for sending token to upstream comonents after submission
   */
  @Output() itinerarySubmitted = new EventEmitter();

  constructor(private dirService:DirectionsService) { }

  ngOnInit() {
  }

  /**
   * Sends origin,destination to API to receive token ,
   *  which is further emitted to upstream parent component
   * @param dirInp input for origin,destination pair
   */
  public findDirections(dirInp:any){
    if(!dirInp.origin || !dirInp.destination){
      alert("Please enter starting and dropoff point")
    }else{
      this.dirService.submitItinerary(dirInp.origin,dirInp.destination)
          .subscribe(res=>{
              console.log(res);
              this.itinerarySubmitted.emit(res.token);
          },err=>{
            console.log(err)
            alert(err);
          });
        }
  }

  /**
   * Populates distance,time data
   * @param data distance,time data
   */
  populateDistanceData(data:any){
    this.routeParams = data;
  }

  /**
   * Resets form and route params.
   */
  resetForm(){
    this.routeParams=null;
  }

}
