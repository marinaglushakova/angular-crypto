import { Component, ViewChild, Input } from '@angular/core';
import { CryptoListComponent } from 'src/app/components/crypto-list/crypto-list.component';
import { ITicker } from 'src/app/model/ticker';

@Component({
  selector: 'app-ticker-search-page',
  templateUrl: './ticker-search-page.component.html',
  styles: [],
})
export class TickerSearchPageComponent {
  @Input() addedTickersList: ITicker[];
  @ViewChild(CryptoListComponent)
  private cryptoListComponent!: CryptoListComponent;

  title = 'angular-crypto';
  addedTickerName = '';
  selectedTicker = '';

  addItem(ticker: string): void {
    this.addedTickerName = ticker;
  }

  showGraph(ticker: string): void {
    this.selectedTicker = ticker;
  }

  onCloseGraph(): void {
    this.selectedTicker = '';
    this.cryptoListComponent.clearSelection();
  }
}
