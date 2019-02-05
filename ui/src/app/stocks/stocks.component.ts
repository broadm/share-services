import { Component, OnInit, Inject } from '@angular/core';
import { StocksService, Stock } from '../core/stocks.service';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StocksComponent implements OnInit {

  currentView: string = 'Buy';
  transactionColumns: string[] = [ 'date', 'price', 'currentPrice', 'units', 'bookCost', 'marketValue', 'gain','delete' ];
  displayedColumns: string[] = [ 'ticker', 'price', 'currentPrice', 'units', 'bookCost', 'marketValue', 'gain' ];

  constructor(
    private stocksService: StocksService,
    private auth: AuthService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {

  };

  openDeleteDialog(uid: string, stock: Stock): void {
    const dialogRef = this.dialog.open(DeleteDailogComponent, {
      width: '250px',
      data: stock.ticker
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.stocksService.deleteStock(uid, stock)
    });
  }

}

@Component({
  selector: 'delete-dialog',
  template: `
  <h1 mat-dialog-title>Delete {{ticker}}?</h1>
  <div mat-dialog-content>
    <p>Are you sure?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" [mat-dialog-close]>No</button>
    <button mat-raised-button color="accent" [mat-dialog-close]="true">Yes</button>
  </div>
  `
})
export class DeleteDailogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteDailogComponent>,
    @Inject(MAT_DIALOG_DATA) private ticker: string
  ) { }
}

