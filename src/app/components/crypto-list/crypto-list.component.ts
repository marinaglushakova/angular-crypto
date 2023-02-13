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
  @Output() tickerIsAddedEvent = new EventEmitter();
  tickersList: ITicker[] = [];
  paginatedTickers: ITicker[] = [];
  selectedTicker = '';
  filter = '';
  page = 1;
  hasNextPage: false;

  ngOnInit(): void {
    const savedTickers = localStorage.getItem('tickers-list');

    if (savedTickers) {
      this.tickersList = JSON.parse(savedTickers);
    }
  }

  ngOnChanges(changes: { addedTickerName: SimpleChange }): void {
    const tickerToSubscribe = changes.addedTickerName.currentValue;
    if (!tickerToSubscribe) return;

    if (this.checkIfTickerIsAdded()) {
      this.tickerIsAddedEvent.emit();
      return;
    }
    const currentTicker = {
      name: tickerToSubscribe,
      price: '-',
    };
    this.tickersList = [...this.tickersList, currentTicker];
    this.saveToLocalStorage();
  }

  deleteTicker(tickerToDelete: string): void {
    this.tickersList = this.tickersList.filter(
      (ticker) => ticker.name !== tickerToDelete
    );
    this.saveToLocalStorage();
  }

  selectTicker(tickerToSelect: string): void {
    this.selectedTicker = tickerToSelect;
    this.selectTickerEvent.emit(tickerToSelect);
  }

  saveToLocalStorage(): void {
    localStorage.setItem('tickers-list', JSON.stringify(this.tickersList));
  }

  clearSelection(): void {
    this.selectedTicker = '';
  }

  checkIfTickerIsAdded() {
    return (
      this.tickersList.filter((ticker) => ticker.name === this.addedTickerName)
        .length > 0
    );
  }
}
