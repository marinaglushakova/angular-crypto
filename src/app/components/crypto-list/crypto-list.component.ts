import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ITicker } from 'src/app/model/ticker';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnChanges {
  @Input() addedTickerName = '';
  tickersList: ITicker[] = [];

  ngOnChanges(changes: { addedTickerName: SimpleChange }) {
    const tickerToSubscribe = changes.addedTickerName.currentValue;
    if (!tickerToSubscribe) return;
    const currentTicker = {
      name: tickerToSubscribe,
      price: '-',
    };
    this.tickersList.push(currentTicker);
  }
}
