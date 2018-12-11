import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StocksService } from './stocks.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [
    AuthService, 
    AuthGuard, 
    StocksService]
})
export class CoreModule { }
