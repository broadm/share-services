import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { AddStockComponent } from './add-stock.component';
import { StocksService } from 'src/app/core/stocks.service';
import { AuthService } from 'src/app/core/auth.service';
import { AlphaVantageProviderService } from 'src/app/providers/alpha-vantage-provider.service';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;

  let stocksServiceSpy = jasmine.createSpy('StocksService');
  let providerServiceSpy = jasmine.createSpy('AlphaVantageProviderService');
  let authServiceSpy = jasmine.createSpy('AuthService');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AddStockComponent 
      ],
      imports: [ 
        FormsModule,
        CoreModule 
      ],
      providers: [
        AddStockComponent,
        { provide: StocksService, useValue: stocksServiceSpy },
        { provide: AlphaVantageProviderService, useValue: providerServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
