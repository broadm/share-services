import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StocksService } from '../core/stocks.service';
import { testStocks } from '../core/stocks.service.spec';
import { StocksComponent } from './stocks.component';
import { FormsModule } from '@angular/forms';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let stocksServiceSpy = jasmine.createSpyObj('StocksService', ['getStocks']);

  const mockAuthService = {
    'user': of({ uid: 123 })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksComponent ],
      imports: [ FormsModule ],
      providers: [
        StocksComponent, 
          { provide: StocksService, useValue: stocksServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    stocksServiceSpy.getStocks.and.returnValue(of(testStocks));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
