import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { StocksComponent } from './stocks/stocks.component';
import { AddStockComponent } from './stocks/add-stock/add-stock.component';
import { StockTypePipe } from './pipes/stock-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    StocksComponent,
    AddStockComponent,
    StockTypePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
