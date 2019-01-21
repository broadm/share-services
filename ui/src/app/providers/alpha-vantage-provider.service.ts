import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProviderService } from './provider-service';
import { Stock } from '../core/stocks.service';

const baseUrl = `https://www.alphavantage.co/query?apikey=${environment.alphavantage.apiKey}`;

enum avFunctions {
  GLOBAL_QUOTE = "GLOBAL_QUOTE",
  SYMBOL_SEARCH = "SYMBOL_SEARCH"
}

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageProviderService implements ProviderService {

  constructor(private http: HttpClient) { }

  price(ticker: string): Observable<Stock> {
    return this.http.get(`${baseUrl}&function=${avFunctions.GLOBAL_QUOTE}&symbol=${ticker}`).pipe(
      pluck('Global Quote'),
      map(data => {
        if (data) {
          return this.parseJson(data);
        }
        return {} as Stock;
      }
      ))
  }

  search(term: string): Observable<Stock[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<string[]>(`${baseUrl}&function=${avFunctions.SYMBOL_SEARCH}&keywords=${term}`).pipe(
      map(data => {
        const tickers: Stock[] = [];
        data['bestMatches'].forEach(element => {
          tickers.push(this.parseJson(element));
        });
        return tickers;
      })
    )
  }

  private parseJson(data: any): Stock {
    return {
      ticker: data['1. symbol'],
      name: data['2. name'],
      price: data['05. price']
    } as Stock;
  }
}
