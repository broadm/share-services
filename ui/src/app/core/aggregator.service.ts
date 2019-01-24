import { Injectable } from '@angular/core';
import { AlphaVantageProviderService } from '../providers/alpha-vantage-provider.service';
import { Stock } from './stocks.service';

export interface AggregateStock extends Stock {
  currentPrice: number;
  bookCost: number;
  marketValue: number;
  gain: number;
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
        this.calculateGain(stock);
      });
    })
    return aggregatedStocks;
  }

  private calculateGain(stock: AggregateStock): void {
    stock.bookCost = (stock.price * stock.units) / 100;
    stock.marketValue = (stock.currentPrice * stock.units) / 100;
    stock.gain = stock.marketValue - stock.bookCost;
  }
}
