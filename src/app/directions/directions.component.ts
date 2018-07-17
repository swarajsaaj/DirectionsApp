import { Component, OnInit, ViewChild } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { DirectionsService } from '../core/services/directions.service';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  /**
   * Loader component
   */
  public spinkit = Spinkit;

  /**
   * Path to be passed to map child component
   */
  path:string[][];

  /**
   * Route params to be passed to form component
   */
  routeParams:any;

  constructor(private dirService:DirectionsService) { }

  ngOnInit() {
  }

  /**
   * Fetch route with token.
   * @param token 
   */
  itinerarySubmitted(token:string){
    this.dirService.getRoute(token)
    .subscribe(res=>{
        if(res.error==null){
          this.handleRoute(res);
        }else{
          alert(res.error);
        }
    },err=>{
      alert(err);
    });
  }
  
  /**
   * Hadle route params by setting path and routeParams
   * @param routeData 
   */
  handleRoute(routeData:any){
    this.path=routeData.path;
    this.routeParams={
      distance: routeData.total_distance,
      duration: routeData.total_time
    };
  
  }

}
