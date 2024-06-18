import { TestBed } from '@angular/core/testing';

import { SimulationPretService } from './simulation-pret.service';

describe('SimulationPretService', () => {
  let service: SimulationPretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationPretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
