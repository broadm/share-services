import { Component, OnInit, Input } from '@angular/core';
import { Stock, StocksService } from '../core/stocks.service';
import { AggregatorService } from '../core/aggregator.service';
import { AuthService } from '../core/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(
    private stocksService: StocksService,
    private aggregatorService: AggregatorService, 
    private auth: AuthService
    ) {}

  ngOnInit() {
    
  };
}
