import { Component, OnInit, Inject } from '@angular/core';
import { StocksService, Stock } from '../core/stocks.service';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  currentView: string = 'Buy';
  displayedColumns: string[] = [ 'ticker', 'date', 'price', 'currentPrice', 'units', 'bookCost', 'marketValue', 'gain','delete' ];

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

