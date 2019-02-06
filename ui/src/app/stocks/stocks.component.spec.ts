import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StocksService } from '../core/stocks.service';
import { testTransactions } from '../core/stocks.service.spec';
import { StocksComponent } from './stocks.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { StockTypePipe } from '../pipes/stock-type.pipe';
import { AuthService } from '../core/auth.service';
import { MatDialog } from '@angular/material';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let stocksServiceSpy = jasmine.createSpyObj('StocksService', ['getStocks']);

  const mockAuthService = {
    'user': of({ uid: 123 })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StocksComponent,
        StockTypePipe
      ],
      imports: [ 
        FormsModule,
        CoreModule
      ],
      providers: [
        StocksComponent, 
          { provide: StocksService, useValue: stocksServiceSpy },
          { provide: AuthService, useValue: jasmine.createSpy('AuthService') },
          { provide: MatDialog, useValue: jasmine.createSpy('MatDialog') }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    stocksServiceSpy.getStocks.and.returnValue(of(testTransactions));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
