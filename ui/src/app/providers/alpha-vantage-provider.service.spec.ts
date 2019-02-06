import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AlphaVantageProviderService } from './alpha-vantage-provider.service';

describe('AlphaVantageProviderService', () => {
  let httpClientSpy = jasmine.createSpy('HttpClient');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlphaVantageProviderService, 
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', inject([AlphaVantageProviderService], (service: AlphaVantageProviderService) => {
    expect(service).toBeTruthy();
  }));
});
