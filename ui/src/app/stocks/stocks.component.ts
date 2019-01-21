import { Component, OnInit } from '@angular/core';
import { StocksService, StockType } from '../core/stocks.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  currentView: string = 'Buy';
  displayedColumns: string[] = [ 'ticker', 'date', 'price', 'currentPrice', 'units', 'delete' ];

  constructor(
    private stocksService: StocksService,
    private auth: AuthService
    ) {}

  ngOnInit() {

  };

}
