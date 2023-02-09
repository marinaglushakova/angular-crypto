import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { TickerPriceService } from '../../services/ticker-price.service';
import { ITicker } from 'src/app/model/ticker';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnChanges {
  @Input() addedTickerName = '';
  isSelected = true;
  tickersList: ITicker[] = [];

  constructor(private tickerPriceService: TickerPriceService) {}

  ngOnChanges(changes: { addedTickerName: SimpleChange }) {
    const tickerToSubscribe = changes.addedTickerName.currentValue;
    if (!tickerToSubscribe) return;
    const currentTicker = {
      name: tickerToSubscribe,
      price: '-',
    };
    this.tickersList.push(currentTicker);
    this.subscribeToPriceUpdate(tickerToSubscribe);
  }

  subscribeToPriceUpdate(ticker: string): void {
    this.tickerPriceService.getPrice(ticker).subscribe((price) => {
      console.log(price);
    });
  }
}
