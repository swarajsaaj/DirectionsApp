import { TestBed, inject,getTestBed } from '@angular/core/testing';

import { DirectionsService } from './directions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DirAppConstants } from '../../shared/constants/dir-app-constants'

describe('DirectionsService', () => {
  let injector: TestBed;
  let service: DirectionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectionsService]
    });
    injector = getTestBed();
    service = injector.get(DirectionsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  //Normal success case of fetching token
  it('submitItinerary works', inject([DirectionsService], (service: DirectionsService) => {

    service.submitItinerary("a","b").subscribe(response => {
      expect(response.token).toBeTruthy();
    });

    const req = httpMock.expectOne(`${DirAppConstants.BASE_API}/route`);
    expect(req.request.method).toBe("POST");
    req.flush({"token":"abcde"});

  }));

  //Testing retries
  it('submitItinerary retry works', inject([DirectionsService], (service: DirectionsService) => {

    service.submitItinerary("a","b").subscribe(response => {
     expect(response.token).toBeTruthy();
    },err=>{
      expect(err).toEqual('Something bad happened; please try again later.')
    });

    for(var i=0;i<4;i++){
      const req = httpMock.expectOne(`${DirAppConstants.BASE_API}/route`);
      expect(req.request.method).toBe("POST");
      req.error(new ErrorEvent('fail'), {status: 500});
    }

  }));

  //Fetching route from token
  it('getRoute works', inject([DirectionsService], (service: DirectionsService) => {
    var token:string ="token";
    service.getRoute(token).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.status).toEqual('success');
    });

    const req = httpMock.expectOne(`${DirAppConstants.BASE_API}/route/${token}`);
    expect(req.request.method).toBe("GET");
    req.flush({
          status: 'success',
          total_distance: 20000,
          total_time: 1800
      });

  }));

  
  //Testing 500 and non success status
  it('getRoute retry works for 500 and success=in progress', inject([DirectionsService], (service: DirectionsService) => {
    var token:string ="token";
    service.getRoute(token).subscribe(response => {
     expect(response).toBeNull();
    },err=>{
      expect(err).toEqual('Something bad happened; please try again later.')
    });
  
    //Testing 500
    for(var i=0;i<2;i++){
      const req = httpMock.expectOne(`${DirAppConstants.BASE_API}/route/${token}`);
      expect(req.request.method).toBe("GET");
      req.error(new ErrorEvent('fail'), {status: 500});
    }

    //Testing non success status
    for(var i=0;i<2;i++){
      const req = httpMock.expectOne(`${DirAppConstants.BASE_API}/route/${token}`);
      expect(req.request.method).toBe("GET");
      req.flush({status: 'in progress'});
    }

  }));

  

});
