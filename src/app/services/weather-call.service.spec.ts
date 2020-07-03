import { TestBed } from '@angular/core/testing';

import { WeatherCallService } from './weather-call.service';

describe('WeatherCallService', () => {
  let service: WeatherCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
