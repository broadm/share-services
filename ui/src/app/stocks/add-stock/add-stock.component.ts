import { Component, OnInit, Input } from '@angular/core';
import { Stock, StocksService } from '../../core/stocks.service';
import { AuthService } from 'src/app/core/auth.service';

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

  constructor(
    private stocksService: StocksService, 
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

}
