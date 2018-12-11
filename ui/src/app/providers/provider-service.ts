import { Observable } from 'rxjs';

export interface ProviderService {

    price(ticker: string): Observable<StockQuote>;

    search(term: string): Observable<string[]>;
}

export interface StockQuote {
    "05. price": number;
}