import { TestBed } from '@angular/core/testing';

import { DetailSimulationService } from './detail-simulation.service';

describe('DetailSimulationService', () => {
  let service: DetailSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
