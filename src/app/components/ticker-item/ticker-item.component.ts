import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ITicker } from 'src/app/model/ticker';
import { TickerPriceService } from '../../services/ticker-price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-item',
  templateUrl: './ticker-item.component.html',
  styles: [],
})
export class TickerItemComponent implements OnInit {
  @Input() ticker: ITicker;
  @Output() deleteTickerEvent = new EventEmitter<string>();
  isSelected = true;
  subscription: Subscription;

  constructor(private tickerPriceService: TickerPriceService) {}

  ngOnInit() {
    this.subscribeToPriceUpdate(this.ticker.name);
  }

  subscribeToPriceUpdate(ticker: string): void {
    this.subscription = this.tickerPriceService
      .getPrice(ticker)
      .subscribe((price: number) => {
        this.ticker.price = price;
      });
  }

  onDeleteButtonClick() {
    this.subscription.unsubscribe();
    this.deleteTickerEvent.emit(this.ticker.name);
  }
}
