import { TestBed, inject } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { StocksService, StockType, Stock } from './stocks.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AggregatorService } from './aggregator.service';

export const testTransactions = [
  {
    id: "1",
    ticker: "BP",
    name: "BP",
    date: new Date(),
    price: 123.23,
    units: 756,
    type: StockType.Buy
  },
  {
    id: "2",
    ticker: "TSCO",
    name: "Tesco",
    date: new Date(),
    price: 867.45,
    units: 23,
    type: StockType.Buy
  }
];

export const testStockSummary = [
  {
    name: "BP",
    price: 123.23,
    units: 756, 
    transactions: [
      {
        id: "1",
        ticker: "BP",
        name: "BP",
        date: new Date(),
        price: 123.23,
        units: 756,
        type: StockType.Buy
      }
    ]
  },
  {
    name: "TSCO",
    price: 867.45,
    units: 23,
    transactions: [
      {
        id: "2",
        ticker: "TSCO",
        name: "Tesco",
        date: new Date(),
        price: 867.45,
        units: 23,
        type: StockType.Buy
      }
    ]
  }
  ];

describe('StocksService', () => {

  let firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);
  let collectionSpy = jasmine.createSpyObj('AngularFirestoreCollection', ['snapshotChanges', 'doc']);
  let documentSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['set', 'delete']);
  let aggregatorSpy = jasmine.createSpyObj('AggregatorService', ['aggregateStocks']);

  const testUser = { uid: "123" };
  let mockAuthService = {
    user: of(testUser)
  }

  const docChangeActionArray = [{
    payload: {
      doc: {
        data() { return testTransactions[0] },
        id: testTransactions[0].id
      }
    }
  },
  {
    payload: {
      doc: {
        data() { return testTransactions[1] },
        id: testTransactions[1].id
      }
    }
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StocksService,
        { provide: AngularFirestore, useValue: firestoreSpy },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AggregatorService, useValue: aggregatorSpy }
      ]
    });
    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.snapshotChanges.and.returnValue(of(docChangeActionArray));
    collectionSpy.doc.and.returnValue(documentSpy);
  });

  it('should be created', inject([StocksService], (service: StocksService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve stock data and aggregate', inject([StocksService], (service: StocksService) => {
    service.stocks$.subscribe(() => {
      expect(firestoreSpy.collection).toHaveBeenCalledWith(`stocks/${testUser.uid}/data`);
      expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
      expect(aggregatorSpy.aggregateStocks).toHaveBeenCalledWith(testTransactions);
    });
  }));

  it('should add stock', inject([StocksService], (service: StocksService) => {
    const newDocId = "new-doc1";
    firestoreSpy.createId.and.returnValue(newDocId);

    service.addStock(testUser.uid, testTransactions[0]);

    expect(firestoreSpy.createId).toHaveBeenCalled();
    expect(collectionSpy.doc).toHaveBeenCalledWith(newDocId);
    expect(documentSpy.set).toHaveBeenCalledWith(testTransactions[0]);
  }));

  it('should delete stock', inject([StocksService], (service: StocksService) => {
    service.deleteStock(testUser.uid, testTransactions[1]);

    expect(collectionSpy.doc).toHaveBeenCalledWith(testTransactions[1].id);
    expect(documentSpy.delete).toHaveBeenCalled();
  }));

  it('should not add stock', inject([StocksService], (service: StocksService) => {
    firestoreSpy.createId.calls.reset();
    collectionSpy.doc.calls.reset();
    documentSpy.set.calls.reset();

    service.addStock(testUser.uid, null);

    expect(firestoreSpy.createId).not.toHaveBeenCalled();
    expect(collectionSpy.doc).not.toHaveBeenCalled();
    expect(documentSpy.set).not.toHaveBeenCalled();
  }));
});
