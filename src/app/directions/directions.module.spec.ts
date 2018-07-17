import { DirectionsModule } from './directions.module';

describe('DirectionsModule', () => {
  let directionsModule: DirectionsModule;

  beforeEach(() => {
    directionsModule = new DirectionsModule();
  });

  it('should create an instance', () => {
    expect(directionsModule).toBeTruthy();
  });
});
