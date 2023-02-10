import { Pipe, PipeTransform } from '@angular/core';
import { ITicker } from '../model/ticker';

@Pipe({
  name: 'filterTickers',
})
export class FilterTickersPipe implements PipeTransform {
  transform(tickers: ITicker[], filter: string): ITicker[] {
    return tickers.filter((ticker) =>
      ticker.name.includes(filter.toUpperCase())
    );
  }
}
