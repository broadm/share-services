import { Injectable } from '@angular/core';
import { AlphaVantageProviderService } from '../providers/alpha-vantage-provider.service';
import { Stock, StockType } from './stocks.service';

export interface StockSummary {
  ticker: string,
  type: StockType,
  // name: string,
  units: number,
  price: number,
  currentPrice?: number,
  bookCost?: number;
  marketValue?: number;
  gain?: number;
  transactions: AggregateStock[]
}

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

  aggregateStocks(stocks: AggregateStock[]): StockSummary[] {
    var stockSummary: StockSummary[] = [];
    stocks.forEach(stock => {
      let element = stockSummary.find(s => s.ticker === stock.ticker);
      if (element) {
        this.useExistingStockData(element, stock);
      } else {
        stockSummary.push(this.requestNewStockData(stock));
      }
    })
    return stockSummary;
  }

  private useExistingStockData(summary: StockSummary, stock: AggregateStock): void {
    stock.currentPrice = summary.transactions[0].currentPrice;
    summary.transactions.push(stock);
    this.calculateGains(stock);
    this.recalculateAverages(summary);
  }

  private requestNewStockData(stock: AggregateStock): StockSummary {
    let summary: StockSummary = {
      ticker: stock.ticker,
      type: stock.type,
      units: stock.units,
      price: stock.price,
      transactions: [stock]
    };
    this.providerService.price(stock.ticker).subscribe(value => {
      stock.currentPrice = value.price;
      this.calculateGains(stock);
      summary.currentPrice = stock.price;
      summary.bookCost = stock.bookCost;
      summary.marketValue = stock.marketValue;
      summary.gain = stock.gain;
    });
    return summary;
  }

  private calculateGains(stock: AggregateStock): void {
    stock.bookCost = (stock.price * stock.units) / 100;
    stock.marketValue = (stock.currentPrice * stock.units) / 100;
    stock.gain = stock.marketValue - stock.bookCost;
  }

  private recalculateAverages(summary: StockSummary) {
    let units = summary.transactions.reduce((a, b) => +a + +b.units, 0);
    let price = summary.transactions.reduce((a, b) => +a + +b.price, 0) / summary.transactions.length;
    summary.units = units;
    summary.price = price;
    summary.bookCost = (units * price) / 100;
    summary.marketValue = (summary.currentPrice * units) / 100;
    summary.gain = summary.marketValue - summary.bookCost;
  }
}
