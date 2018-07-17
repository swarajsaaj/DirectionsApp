import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { RouteResponse } from '../../directions/models/route-response';
import { DirAppConstants} from '../../shared/constants/dir-app-constants'
@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  /**
   * Success as returned from API
   */
  SUCCESS_STATUS: string = 'success';

  constructor(private client: HttpClient) { }

  /**
   * Submits origin,destination pair and fetches token.
   * Supports retry upto given number.
   * @param origin 
   * @param destination 
   */
  public submitItinerary(origin: string, destination: string): Observable<any> {
    return this.client.post(DirAppConstants.BASE_API + "/route", { origin: origin, destination: destination })
      .pipe(
        retry(DirAppConstants.RETRY_COUNT),
        catchError(this.handleError)
      );
  }

  /**
   * Gets route for given token
   * Supports retries for given number.
   * @param token 
   */
  public getRoute(token: string): Observable<any> {
    return this.client.get<RouteResponse>(DirAppConstants.BASE_API + `/route/${token}`)
      .pipe(
        tap(res => {
          if (res.status != this.SUCCESS_STATUS && res.error == null) {
            throw new Error("Non success status: " + res.status)
          }
        }),
        retry(DirAppConstants.RETRY_COUNT),
        catchError(this.handleError)
      );
  }

  /**
   * Generic error handling
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    var errorMsg = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      errorMsg
    );
  };

}
