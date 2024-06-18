import { TestBed } from '@angular/core/testing';

import { HistoriqueSimulationService } from './historique-simulation.service';

describe('HistoriqueSimulationService', () => {
  let service: HistoriqueSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
