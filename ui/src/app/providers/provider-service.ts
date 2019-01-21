import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Stock } from '../core/stocks.service';

export const PROVIDER_SERVICE = new InjectionToken<ProviderService>('provider.service');

export interface ProviderService {

    price(ticker: string): Observable<Stock>;

    search(term: string): Observable<Stock[]>;
}
