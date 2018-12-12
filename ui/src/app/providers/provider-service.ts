import { Observable } from 'rxjs';

export interface ProviderService {

    price(ticker: string): Observable<StockQuote>;

    search(term: string): Observable<string[]>;
}

export interface StockQuote {
    price: number;
}