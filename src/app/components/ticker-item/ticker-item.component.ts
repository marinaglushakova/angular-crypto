import { Component, Input, OnInit } from '@angular/core';
import { ITicker } from 'src/app/model/ticker';
import { TickerPriceService } from '../../services/ticker-price.service';

@Component({
  selector: 'app-ticker-item',
  templateUrl: './ticker-item.component.html',
  styles: [],
})
export class TickerItemComponent implements OnInit {
  @Input() ticker: ITicker;
  isSelected = true;

  constructor(private tickerPriceService: TickerPriceService) {}

  ngOnInit() {
    this.subscribeToPriceUpdate(this.ticker.name);
  }

  subscribeToPriceUpdate(ticker: string): void {
    this.tickerPriceService.getPrice(ticker).subscribe((price: number) => {
      this.ticker.price = price;
    });
  }
}
