import { TestBed, inject } from '@angular/core/testing';

import { AggregatorService } from './aggregator.service';

describe('AggregatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregatorService]
    });
  });

  it('should be created', inject([AggregatorService], (service: AggregatorService) => {
    expect(service).toBeTruthy();
  }));
});
