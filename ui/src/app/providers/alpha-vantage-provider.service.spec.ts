import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AlphaVantageProviderService } from './alpha-vantage-provider.service';

describe('AlphaVantageProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlphaVantageProviderService, HttpClient]
    });
  });

  it('should be created', inject([AlphaVantageProviderService], (service: AlphaVantageProviderService) => {
    expect(service).toBeTruthy();
  }));
});
