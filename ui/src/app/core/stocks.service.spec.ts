import { TestBed, inject } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { StocksService, StockType, Stock } from './stocks.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

export const testStocks = [
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

describe('StocksService', () => {

  let firestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);
  let collectionSpy = jasmine.createSpyObj('AngularFirestoreCollection', ['snapshotChanges', 'doc']);
  let documentSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['set', 'delete']);

  const testUser = { uid: "123" };
  let mockAuthService = {
    user: of(testUser)
  }

  const docChangeActionArray = [{
    payload: {
      doc: {
        data() { return testStocks[0] },
        id: testStocks[0].id
      }
    }
  },
  {
    payload: {
      doc: {
        data() { return testStocks[1] },
        id: testStocks[1].id
      }
    }
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StocksService,
        { provide: AngularFirestore, useValue: firestoreSpy },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    firestoreSpy.collection.and.returnValue(collectionSpy);
    collectionSpy.snapshotChanges.and.returnValue(of(docChangeActionArray));
    collectionSpy.doc.and.returnValue(documentSpy);
  });

  it('should be created', inject([StocksService], (service: StocksService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the list of stocks', inject([StocksService], (service: StocksService) => {
    service.getStocks(testUser.uid).subscribe(stocks => {
      expect(firestoreSpy.collection).toHaveBeenCalledWith(`stocks/${testUser.uid}/data`);
      expect(stocks).toEqual(testStocks);
    });
  }));

  it('should add stock', inject([StocksService], (service: StocksService) => {
    const newDocId = "new-doc1";
    firestoreSpy.createId.and.returnValue(newDocId);

    service.addStock(testUser.uid, testStocks[0]);

    expect(firestoreSpy.createId).toHaveBeenCalled();
    expect(collectionSpy.doc).toHaveBeenCalledWith(newDocId);
    expect(documentSpy.set).toHaveBeenCalledWith(testStocks[0]);
  }));

  it('should delete stock', inject([StocksService], (service: StocksService) => {
    service.deleteStock(testUser.uid, testStocks[1]);

    expect(collectionSpy.doc).toHaveBeenCalledWith(testStocks[1].id);
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
