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
import { TickerPriceService } from '../../services/ticker-price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-item',
  templateUrl: './ticker-item.component.html',
  styles: [],
})
export class TickerItemComponent implements OnInit, OnChanges {
  @Input() ticker: ITicker;
  @Input() selectedTicker: string;
  @Output() deleteTickerEvent = new EventEmitter<string>();
  @Output() selectTickerEvent = new EventEmitter<string>();
  isSelected = false;
  subscription: Subscription;

  constructor(private tickerPriceService: TickerPriceService) {}

  ngOnInit(): void {
    this.isSelected = this.selectedTicker === this.ticker.name;
    this.subscribeToPriceUpdate(this.ticker.name);
  }

  ngOnChanges(changes: { selectedTicker: SimpleChange }): void {
    this.isSelected = this.selectedTicker === this.ticker.name;
  }

  subscribeToPriceUpdate(ticker: string): void {
    this.subscription = this.tickerPriceService
      .getPrice(ticker)
      .subscribe((price: number) => {
        this.ticker.price = price;
      });
  }

  onDeleteButtonClick(): void {
    this.subscription.unsubscribe();
    this.deleteTickerEvent.emit(this.ticker.name);
  }

  onItemSelect(): void {
    this.isSelected = true;
    this.selectTickerEvent.emit(this.ticker.name);
  }
}
