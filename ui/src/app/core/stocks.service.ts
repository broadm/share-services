import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AggregatorService, AggregateStock, StockSummary } from './aggregator.service';
import * as moment from 'moment';

export enum StockType {
  Buy,
  Sell
}

export interface Stock {
  id: string,
  ticker: string,
  name: string,
  date: Date,
  price: number,
  units: number,
  type: StockType
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stocks$: Observable<StockSummary[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private aggregatorService: AggregatorService
  ) {
    this.stocks$ = this.authService.user.pipe(
      map(user => user.uid)
      ,switchMap(uid => uid ? this.afs.collection<Stock>(`stocks/${uid}/data`).snapshotChanges() : of(null))
      ,map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Stock;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      ,map(stocks => this.aggregatorService.aggregateStocks(stocks as AggregateStock[]))
    );
  }

  addStock(uid: string, stockData: Stock) {
    if (stockData) {
      const id = this.afs.createId();
      stockData.id = id;
      stockData.date = moment(stockData.date).toDate();
      this.afs.collection<Stock>(`stocks/${uid}/data`).doc(id).set(stockData);
    }
  }

  deleteStock(uid: string, stockData: Stock) {
    if (stockData) {
      this.afs.collection<Stock>(`stocks/${uid}/data`).doc(stockData.id).delete();
    }
  }
}
