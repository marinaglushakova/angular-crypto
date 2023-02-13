import { Injectable } from '@angular/core';
import { ITicker } from '../model/ticker';

@Injectable({
  providedIn: 'root',
})
export class AddedTickersService {
  tickers: ITicker[];

  getTickers() {
    return this.tickers;
  }

  setTicker(ticker: ITicker): void {
    this.tickers = [...this.tickers, ticker];
  }

  setTickers(tickers: ITicker[]): void {
    this.tickers = tickers;
  }

  deleteTicker(tickerToDelete: string): void {
    this.tickers = this.tickers.filter(
      (ticker) => ticker.name !== tickerToDelete
    );
  }

  checkIfAdded(addedTicker: string): boolean {
    return (
      this.tickers.filter((ticker) => ticker.name == addedTicker).length > 0
    );
  }
}
