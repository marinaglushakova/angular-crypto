import { Component, OnInit } from '@angular/core';
import { TickersService } from './services/tickers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crypto';
  fullTickersList: string[] = [];

  constructor(private tickersService: TickersService) {}

  ngOnInit(): void {
    this.tickersService.getAll().subscribe((r: string[]) => {
      this.fullTickersList = r;
    });
  }

  addItem(ticker: string) {
    console.log(ticker);
  }
}
