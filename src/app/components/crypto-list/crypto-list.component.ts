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
import { AddedTickersService } from 'src/app/services/added-tickers.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnInit, OnChanges {
  @Input() addedTickerName = '';
  @Output() selectTickerEvent = new EventEmitter<string>();
  @Output() deleteTickerEvent = new EventEmitter();
  paginatedTickers: ITicker[] = [];
  selectedTicker = '';
  filter = '';
  page = 1;
  hasNextPage: false;

  constructor(public addedTickersService: AddedTickersService) {}

  ngOnInit(): void {
    const savedTickers = localStorage.getItem('tickers-list');

    if (savedTickers) {
      this.addedTickersService.setTickers(JSON.parse(savedTickers));
    }
  }

  ngOnChanges(changes: { addedTickerName: SimpleChange }): void {
    const tickerToSubscribe = changes.addedTickerName.currentValue;
    if (!tickerToSubscribe) return;

    const currentTicker = {
      name: tickerToSubscribe,
      price: '-',
    };
    this.addedTickersService.setTicker(currentTicker);
    this.saveToLocalStorage();
  }

  deleteTicker(tickerToDelete: string): void {
    this.addedTickersService.deleteTicker(tickerToDelete);
    this.saveToLocalStorage();
    this.deleteTickerEvent.emit();
  }

  selectTicker(tickerToSelect: string): void {
    this.selectedTicker = tickerToSelect;
    this.selectTickerEvent.emit(tickerToSelect);
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      'tickers-list',
      JSON.stringify(this.addedTickersService.getTickers())
    );
  }

  clearSelection(): void {
    this.selectedTicker = '';
  }
}
