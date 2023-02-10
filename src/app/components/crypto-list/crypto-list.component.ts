import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { ITicker } from 'src/app/model/ticker';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnInit, OnChanges {
  @Input() addedTickerName = '';
  @Output() selectTickerEvent = new EventEmitter<string>();
  tickersList: ITicker[] = [];
  selectedTicker = '';
  filter = '';

  ngOnInit() {
    const savedTickers = localStorage.getItem('tickers-list');

    if (savedTickers) {
      this.tickersList = JSON.parse(savedTickers);
    }
  }

  ngOnChanges(changes: { addedTickerName: SimpleChange }) {
    const tickerToSubscribe = changes.addedTickerName.currentValue;
    if (!tickerToSubscribe) return;
    const currentTicker = {
      name: tickerToSubscribe,
      price: '-',
    };
    this.tickersList.push(currentTicker);
    this.saveToLocalStorage();
  }

  deleteTicker(tickerToDelete: string) {
    this.tickersList = this.tickersList.filter(
      (ticker) => ticker.name !== tickerToDelete
    );
    this.saveToLocalStorage();
  }

  selectTicker(tickerToSelect: string) {
    this.selectedTicker = tickerToSelect;
    this.selectTickerEvent.emit(tickerToSelect);
  }

  saveToLocalStorage() {
    localStorage.setItem('tickers-list', JSON.stringify(this.tickersList));
  }

  clearSelection() {
    this.selectedTicker = '';
  }
}
