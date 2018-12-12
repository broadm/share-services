import { Pipe, PipeTransform } from '@angular/core';
import { AggregateStock } from '../core/aggregator.service';
import { StockType } from '../core/stocks.service';

@Pipe({
  name: 'stockType'
})
export class StockTypePipe implements PipeTransform {

  transform(value: AggregateStock[], type: StockType): AggregateStock[] {
    return value && type ? value.filter(stock => stock.type === type) : value;
  }

}
