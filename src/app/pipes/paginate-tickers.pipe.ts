import { Pipe, PipeTransform } from '@angular/core';
import { ITicker } from '../model/ticker';

@Pipe({
  name: 'paginateTickers',
})
export class PaginateTickersPipe implements PipeTransform {
  transform(tickers: ITicker[], page: number): ITicker[] {
    const startIndex = 6 * (page - 1);
    const endIndex = 6 * page;

    return tickers.slice(startIndex, endIndex);
  }
}
