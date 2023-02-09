import { Component, OnInit, ViewChild } from '@angular/core';
import { TickersService } from './services/tickers.service';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(CryptoListComponent)
  private cryptoListComponent!: CryptoListComponent;

  title = 'angular-crypto';
  fullTickersList: string[] = [];
  addedTickerName = '';
  selectedTicker = '';

  constructor(private tickersService: TickersService) {}

  ngOnInit(): void {
    this.tickersService.getAll().subscribe((tickers: string[]) => {
      this.fullTickersList = tickers;
    });
  }

  addItem(ticker: string) {
    this.addedTickerName = ticker;
  }

  showGraph(ticker: string) {
    this.selectedTicker = ticker;
  }

  onCloseGraph() {
    this.selectedTicker = '';
    this.cryptoListComponent.clearSelection();
  }
}
