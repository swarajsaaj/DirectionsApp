import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsFormComponent } from './directions-form.component';
import { DirectionsService } from '../../core/services/directions.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('DirectionsFormComponent', () => {
  let component: DirectionsFormComponent;
  const token:string = "toky";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DirectionsFormComponent
      ],
      providers:[
        {provide:DirectionsService,useValue:{
          submitItinerary: function(){
            return new Observable((observer) => {
    
              // observable execution
              observer.next({token:token})
              observer.complete()
          })
          }
        }}
      ],
      imports:[FormsModule]
    }).compileComponents();
  }));
  it('should create directionsFormComponent', async(() => {
    const fixture = TestBed.createComponent(DirectionsFormComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should generate token on submit', () => {

    var fixture = TestBed.createComponent(DirectionsFormComponent);
    fixture.detectChanges()
    spyOn(fixture.componentInstance.itinerarySubmitted, 'emit');
    fixture.componentInstance.findDirections({
      origin : "a",
      destination: "b"
    })
    expect(fixture.componentInstance.itinerarySubmitted.emit).toHaveBeenCalledWith(token);
  
  });

});
