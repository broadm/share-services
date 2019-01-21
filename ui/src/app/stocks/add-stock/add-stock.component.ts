import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { AlphaVantageProviderService } from 'src/app/providers/alpha-vantage-provider.service';
import { Stock, StocksService } from '../../core/stocks.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  @Input() stock: Stock = {
    id: null,
    ticker: null,
    name: null,
    date: null,
    price: null,
    units: null,
    type: null
  };

  stocks$: Observable<Stock[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private stocksService: StocksService, 
    private providerService: AlphaVantageProviderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.stocks$ = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => this.providerService.search(term))
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
