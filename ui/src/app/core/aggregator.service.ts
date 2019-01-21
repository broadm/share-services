import { Injectable } from '@angular/core';
import { AlphaVantageProviderService } from '../providers/alpha-vantage-provider.service';
import { Stock } from './stocks.service';

export interface AggregateStock extends Stock {
  currentPrice: number;
  profit: number;
}

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {

  constructor(
    private providerService: AlphaVantageProviderService
  ) { }

  aggregateStocks(stocks: Stock[]): AggregateStock[] {
    var aggregatedStocks = stocks as AggregateStock[];
    aggregatedStocks.forEach(stock => {
      this.providerService.price(stock.ticker).subscribe(value => {
        stock.currentPrice = value.price;
      });
    })
    return aggregatedStocks;
  }
}
