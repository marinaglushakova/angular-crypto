import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { AddTickerComponent } from './components/add-ticker/add-ticker.component';
import { GraphComponent } from './components/graph/graph.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { TickerItemComponent } from './components/ticker-item/ticker-item.component';
import { FilterTickersPipe } from './pipes/filter-tickers.pipe';
import { PaginateTickersPipe } from './pipes/paginate-tickers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    AddTickerComponent,
    GraphComponent,
    LoaderComponent,
    TickerItemComponent,
    FilterTickersPipe,
    PaginateTickersPipe,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
