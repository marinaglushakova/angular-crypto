import { Component, ViewChild, Input } from '@angular/core';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { ITicker } from './model/ticker';
import { AddTickerComponent } from './components/add-ticker/add-ticker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() addedTickersList: ITicker[];
  @ViewChild(CryptoListComponent)
  private cryptoListComponent!: CryptoListComponent;
  @ViewChild(AddTickerComponent)
  private addTickerComponent!: AddTickerComponent;

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
