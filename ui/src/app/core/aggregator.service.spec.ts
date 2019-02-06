import { TestBed, inject } from '@angular/core/testing';
import { AggregatorService } from './aggregator.service';
import { AlphaVantageProviderService } from '../providers/alpha-vantage-provider.service';

describe('AggregatorService', () => {

  let providerSpy = jasmine.createSpyObj('ProviderService', ['price', 'search']);
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AggregatorService,
        { provide: AlphaVantageProviderService, useValue: providerSpy }
      ]
    });
  });

  it('should be created', inject([AggregatorService], (service: AggregatorService) => {

    expect(service).toBeTruthy();
  }));
});
