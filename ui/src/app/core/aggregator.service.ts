import { Injectable } from '@angular/core';
import { Stock, StocksService, StockType } from './stocks.service';
import { AlphaVantageProviderService } from '../providers/alpha-vantage-provider.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface AggregateStock extends Stock {
  currentPrice: number;
  profit: number;
}

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {

  private stocks$: Observable<AggregateStock[]>;

  constructor(
    private stocksService: StocksService,
    private providerService: AlphaVantageProviderService
  ) {
    this.stocks$ = this.stocksService.getStocks().pipe(
      switchMap(stocks => {
        var aggregatedStocks = stocks as AggregateStock[];
        aggregatedStocks.forEach(stock => {
          this.providerService.price(stock.ticker).subscribe(value => {
            stock.currentPrice = value["05. price"];
          });
        })
        return of(aggregatedStocks);
      }))
  }

  getBuyList(): Observable<AggregateStock[]> {
    return this.stocks$.pipe(
      map(stocks => stocks.filter(stock => stock.type === StockType.Buy))
    );
  }
}
