import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

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

  private stocks$: Observable<Stock[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.stocks$ = this.authService.user.pipe(
      map(user => user.uid)
      ,switchMap(uid => uid ? this.afs.collection<Stock>(`stocks/${uid}/data`).snapshotChanges() : of(null))
      ,map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Stock;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getStocks(): Observable<Stock[]> {
    return this.stocks$;
  }

  addStock(uid: string, stockData: Stock) {
    if (stockData) {
      const id = this.afs.createId();
      stockData.id = id;
      this.afs.collection<Stock>(`stocks/${uid}/data`).doc(id).set(stockData);
    }
  }

  deleteStock(uid: string, stockData: Stock) {
    if (stockData) {
      this.afs.collection<Stock>(`stocks/${uid}/data`).doc(stockData.id).delete();
    }
  }

}
