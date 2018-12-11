import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProviderService, StockQuote } from './provider-service';

const baseUrl = `https://www.alphavantage.co/query?apikey=${environment.alphavantage.apiKey}`;

enum avFunctions {
  GLOBAL_QUOTE="GLOBAL_QUOTE",
  SYMBOL_SEARCH="SYMBOL_SEARCH"
}

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageProviderService implements ProviderService {

  constructor(private http: HttpClient) {}

  price(ticker: string): Observable<StockQuote> {
    return this.http.get(`${baseUrl}&function=${avFunctions.GLOBAL_QUOTE}&symbol=${ticker}`).pipe(
      map(data => data['Global Quote'])
    );
  }

  search(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<string[]>(`${baseUrl}&function=${avFunctions.SYMBOL_SEARCH}&symbol=${term}`);
  }
}
